import { Testplan as PrismaTestplan } from '@prisma/client';
import { Testplan as GQLTestplan } from '../resolvers-types';

export const mapTestplan = (model: PrismaTestplan): GQLTestplan => ({
    id: model.id,
});
