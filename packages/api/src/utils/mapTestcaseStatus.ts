import { TestcaseStatus as PrismaTestcaseStatus } from '@prisma/client';
import { TestcaseStatus as GQLTestcaseStatus } from '../resolvers-types';

export const mapTestcaseStatus = (prisma: PrismaTestcaseStatus): GQLTestcaseStatus => {
    switch (prisma) {
        case PrismaTestcaseStatus.FAILURE:
            return GQLTestcaseStatus.Failure;

        case PrismaTestcaseStatus.IN_PROGRESS:
            return GQLTestcaseStatus.InProgress;

        case PrismaTestcaseStatus.SUCCESS:
            return GQLTestcaseStatus.Success;
    }
};
