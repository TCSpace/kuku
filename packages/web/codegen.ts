import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:3000',
    documents: ['src/**/*.vue', 'src/**/*.ts'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/': {
            preset: 'client',
            config: {
                useTypeImports: true,
            },
        },
    },
};

export default config;
