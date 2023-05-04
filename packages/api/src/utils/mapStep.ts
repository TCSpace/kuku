import { Step as PrismaStep } from '@prisma/client';
import { Step as GQLStep } from '../resolvers-types';
import { mapPrismaStepStatus } from './mapStepStatus';

export const mapStep = (model: PrismaStep): GQLStep => ({
    id: model.id,
    comment: model.comment,
    condition: model.condition,
    status: mapPrismaStepStatus(model.status),
});
