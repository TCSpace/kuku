import { StepStatus as PrismaStepStatus } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { Context } from '../contexts';
import { Resolvers, TestcaseStatus as GQLTestcaseStatus } from '../resolvers-types';
import { mapUserRole } from '../utils/mapUserRole';
import { mapTestcase } from '../utils/mapTestcase';
import { mapTestplan } from '../utils/mapTestplan';
import { mapUser } from '../utils/mapUser';
import { mapStep } from '../utils/mapStep';
import { mapGQLStepStatus } from '../utils/mapStepStatus';

export const resolvers: Resolvers<Context> = {
    Query: {
        getMe: async (_, _args, context) => {
            const { username, role } = context.user;

            return {
                username,
                role: mapUserRole(role),
            };
        },
        getAssignedTestcases: async (_, _args, { prisma, user }) => {
            const assigned = await prisma.testcase.findMany({
                where: { assigneeUsername: user.username },
            });

            return assigned.map(mapTestcase);
        },
        getTestplans: async (_, _args, { prisma }) => {
            const testplans = await prisma.testplan.findMany();

            return testplans.map(mapTestplan);
        },
        getTestplanById: async (_, { id }, { prisma }) => {
            const testplan = await prisma.testplan.findUnique({ where: { id } });

            if (!testplan) return null;

            return mapTestplan(testplan);
        },
        getTestcaseById: async (_, { id }, { prisma }) => {
            const testcase = await prisma.testcase.findUnique({ where: { id } });

            if (!testcase) return null;

            return mapTestcase(testcase);
        },
        getStepById: async (_, { id }, { prisma }) => {
            const step = await prisma.step.findUnique({ where: { id } });

            if (!step) return null;

            return mapStep(step);
        },
    },
    Mutation: {
        createTestplan: async (_, args, { prisma }) => {
            const created = await prisma.testplan.create({ data: { id: args.id } });

            return mapTestplan(created);
        },
        createTestcase: async (_, { input }, { prisma }) => {
            const created = await prisma.testcase.create({
                data: {
                    testplanId: input.testplanId,
                    comment: input.comment,
                    precondition: input.precondition,
                    postcondition: input.postcondition,
                    deadline: input.deadline,
                    assigneeUsername: input.assignee,
                },
            });

            return mapTestcase(created);
        },
        updateTestcase: async (_, { input }, { prisma }) => {
            const updated = await prisma.testcase.update({
                where: { id: input.testcaseId },
                data: {
                    precondition: input.precondition,
                    postcondition: input.postcondition,
                    comment: input.comment,
                    deadline: input.deadline,
                    assigneeUsername: input.assignee,
                },
            });

            return mapTestcase(updated);
        },
        updateTestcaseForQA: async (_, { input }, { prisma }) => {
            const updated = await prisma.testcase.update({
                where: { id: input.testcaseId },
                data: {
                    comment: input.comment,
                },
            });

            return mapTestcase(updated);
        },
        createStep: async (_, { input }, { prisma }) => {
            const created = await prisma.step.create({
                data: {
                    testcaseId: input.testcaseId,
                    comment: input.comment,
                    condition: input.condition,
                },
            });

            return mapStep(created);
        },
        updateStepForQA: async (_, { input }, { prisma }) => {
            const updated = await prisma.step.update({
                where: { id: input.stepId },
                data: {
                    comment: input.comment,
                    ...(input.status ? { status: mapGQLStepStatus(input.status) } : {}),
                },
            });

            return mapStep(updated);
        },
        signIn: async (_, { username }, { prisma }) => {
            const user = await prisma.user.findUnique({ where: { username } });

            if (!user) return null;

            return jwt.sign({ username }, 'secretkey', { algorithm: 'HS256' });
        },
    },
    Testplan: {
        testcases: async (testplan, _, { prisma }) => {
            const testcases = await prisma.testcase.findMany({
                where: { testplanId: testplan.id },
            });

            return testcases.map(mapTestcase);
        },
    },
    Testcase: {
        assignee: async (testcase, _, { prisma }) => {
            const found = await prisma.testcase.findUnique({
                where: { id: testcase.id },
                select: { assignee: true },
            });

            if (!found) return null;

            return found.assignee ? mapUser(found.assignee) : null;
        },
        steps: async (testcase, _, { prisma }) => {
            const found = await prisma.testcase.findUnique({
                where: { id: testcase.id },
                select: { steps: true },
            });

            if (!found) return [];

            return found.steps.map(mapStep);
        },
        status: async (testcase, _, { prisma }) => {
            const found = await prisma.testcase.findUnique({
                where: { id: testcase.id },
                select: { steps: true },
            });

            if (!found) {
                return { value: GQLTestcaseStatus.InProgress };
            }

            const steps = found.steps.map(({ status }) => status);

            const failed = steps.filter((status) => status === PrismaStepStatus.FAILURE);
            if (failed.length > 0) {
                return { value: GQLTestcaseStatus.Failure };
            }

            const done = steps.filter((status) => status === PrismaStepStatus.SUCCESS);
            if (done.length === steps.length) {
                return { value: GQLTestcaseStatus.Success };
            }

            return { value: GQLTestcaseStatus.InProgress };
        },
        testplan: async (testcase, _, { prisma }) => {
            const found = await prisma.testcase.findUnique({
                where: { id: testcase.id },
                select: { testplan: true },
            });

            if (!found) {
                return null;
            }

            return mapTestplan(found.testplan);
        },
    },
};
