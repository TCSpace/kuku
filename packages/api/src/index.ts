import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
    type Ticket {
        name: String!
    }

    type Query {
        getTickets: [Ticket]!
    }
`;

const resolvers = {
    Query: {
        getTickets: () => [{ name: 'do smth cool' }],
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 3000,
    },
});

console.log(`🚀  Server ready at: ${url}`);
