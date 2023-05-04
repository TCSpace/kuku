import { User as PrismaUser } from '@prisma/client';
import { User as GQLUser } from '../resolvers-types';
import { mapUserRole } from './mapUserRole';

export const mapUser = (model: PrismaUser): GQLUser => ({
    username: model.username,
    role: mapUserRole(model.role),
});
