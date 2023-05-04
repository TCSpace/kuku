import { StepStatus as PrismaStepStatus } from '@prisma/client';
import { StepStatus as GQLStepStatus } from '../resolvers-types';

export const mapPrismaStepStatus = (prisma: PrismaStepStatus): GQLStepStatus => {
    switch (prisma) {
        case PrismaStepStatus.FAILURE:
            return GQLStepStatus.Failure;

        case PrismaStepStatus.IN_PROGRESS:
            return GQLStepStatus.InProgress;

        case PrismaStepStatus.SUCCESS:
            return GQLStepStatus.Success;
    }
};

export const mapGQLStepStatus = (gql: GQLStepStatus): PrismaStepStatus => {
    switch (gql) {
        case GQLStepStatus.Failure:
            return PrismaStepStatus.FAILURE;

        case GQLStepStatus.InProgress:
            return PrismaStepStatus.IN_PROGRESS;

        case GQLStepStatus.Success:
            return PrismaStepStatus.SUCCESS;
    }
};
