import { IncomingMessage } from 'node:http';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import { Context } from './index';
import { prisma } from '../prisma';

export const authenticateContext = async (req: IncomingMessage): Promise<Context['user']> => {
    try {
        const [_, token] = req.headers.authorization?.split(' ') ?? '';

        const { username } = jwt.verify(token, 'secretkey', { algorithms: ['HS256'] }) as {
            username: string;
        };

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            throw new GraphQLError('Вы не аутенфицированы', {
                extensions: { code: 'UNAUTHENTICATED' },
            });
        }

        return {
            username: user?.username,
            role: user?.role,
        };
    } catch (error) {
        console.log(error);
        return {} as Context['user'];
    }
};
