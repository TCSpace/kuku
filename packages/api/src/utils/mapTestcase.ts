import { Testcase as PrismaTestcase } from '@prisma/client';
import { Testcase as GQLTestcase } from '../resolvers-types';
import { mapTestcaseStatus } from './mapTestcaseStatus';

export const mapTestcase = (model: PrismaTestcase): GQLTestcase => ({
    id: model.id,
    precondition: model.precondition,
    postcondition: model.postcondition,
    comment: model.comment,
    deadline: model.deadline?.toISOString(),
});
