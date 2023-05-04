import { UserRole as PrismaRole } from '@prisma/client';
import { UserRole as GQLRole } from '../resolvers-types';

export const mapUserRole = (prisma: PrismaRole): GQLRole => {
    switch (prisma) {
        case PrismaRole.QA:
            return GQLRole.Qa;

        case PrismaRole.ANALYST:
            return GQLRole.Analyst;

        case PrismaRole.MANAGER:
            return GQLRole.Manager;
    }
};
