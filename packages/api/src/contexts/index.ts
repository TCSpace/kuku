import { PrismaClient, User } from '@prisma/client';
export { authenticateContext } from './authenticate';

export type Context = {
    prisma: PrismaClient;
    user: {
        username: User['username'];
        role: User['role'];
    };
};
