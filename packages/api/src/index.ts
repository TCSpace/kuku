import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';

import { Context, authenticateContext } from './contexts/index';
import { resolvers } from './resolvers/index';
import { prisma } from './prisma';
import { applyRolesToSchema } from './directives/role';

const bootstrap = async () => {
    const typeDefs = await readFile(path.resolve(__dirname, './schemas/schema.graphql'), 'utf-8');

    const schema = applyRolesToSchema(makeExecutableSchema({ typeDefs, resolvers }));

    const server = new ApolloServer<Context>({ schema });

    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => {
            const user = await authenticateContext(req);

            return {
                prisma,
                user,
            };
        },
        listen: { port: 3000 },
    });

    console.info(`🚀  Server ready at: ${url}`);
};

bootstrap();
