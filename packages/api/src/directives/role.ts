import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';

import { Context } from '../contexts';
import { UserRole } from '../resolvers-types';
import { mapUserRole } from '../utils/mapUserRole';

export const applyRolesToSchema = (schema: GraphQLSchema) =>
    mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const fieldRolesDirective = getDirective(schema, fieldConfig, 'role')?.[0];

            if (fieldRolesDirective) {
                const { resolve = defaultFieldResolver } = fieldConfig;

                fieldConfig.resolve = async (source, args, context: Context, info) => {
                    const { role } = context.user;
                    const { roles } = fieldRolesDirective as { roles: UserRole[] };

                    if (!roles.includes(mapUserRole(role))) {
                        throw new GraphQLError('Доступ запрещен', {
                            extensions: { code: 'FORBIDDEN' },
                        });
                    }

                    return resolve(source, args, context, info);
                };
            }

            return fieldConfig;
        },
    });
