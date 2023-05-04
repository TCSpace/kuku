/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query getTestcaseForPage($id: Int!) {\n        getTestcaseById(id: $id) {\n            id\n            testplan {\n                id\n            }\n            status {\n                value\n            }\n            precondition\n            postcondition\n            comment\n            steps {\n                id\n                status\n                condition\n                comment\n            }\n            deadline\n            assignee {\n                username\n                role\n            }\n        }\n    }\n": types.GetTestcaseForPageDocument,
    "\n    mutation editTestcase($input: UpdateTestcaseInput!) {\n        updateTestcase(input: $input) {\n            id\n        }\n    }\n": types.EditTestcaseDocument,
    "\n    mutation editTestcaseForQA($input: UpdateTestcaseForQAInput!) {\n        updateTestcaseForQA(input: $input) {\n            id\n        }\n    }\n": types.EditTestcaseForQaDocument,
    "\n    mutation addCommentForStep($input: UpdateStepForQAInput!) {\n        updateStepForQA(input: $input) {\n            id\n        }\n    }\n": types.AddCommentForStepDocument,
    "\n    query getAssignedTestcasesForList {\n        getAssignedTestcases {\n            id\n            status {\n                value\n            }\n            testplan {\n                id\n            }\n            assignee {\n                username\n            }\n            deadline\n            steps {\n                status\n            }\n        }\n    }\n": types.GetAssignedTestcasesForListDocument,
    "\n    query getTestplansForList {\n        getTestplans {\n            id\n            testcases {\n                id\n                status {\n                    value\n                }\n                testplan {\n                    id\n                }\n                assignee {\n                    username\n                }\n                deadline\n                steps {\n                    status\n                }\n            }\n        }\n    }\n": types.GetTestplansForListDocument,
    "\n    query getMe {\n        getMe {\n            username\n            role\n        }\n    }\n": types.GetMeDocument,
    "\n    mutation signIn($username: String!) {\n        signIn(username: $username)\n    }\n": types.SignInDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTestcaseForPage($id: Int!) {\n        getTestcaseById(id: $id) {\n            id\n            testplan {\n                id\n            }\n            status {\n                value\n            }\n            precondition\n            postcondition\n            comment\n            steps {\n                id\n                status\n                condition\n                comment\n            }\n            deadline\n            assignee {\n                username\n                role\n            }\n        }\n    }\n"): (typeof documents)["\n    query getTestcaseForPage($id: Int!) {\n        getTestcaseById(id: $id) {\n            id\n            testplan {\n                id\n            }\n            status {\n                value\n            }\n            precondition\n            postcondition\n            comment\n            steps {\n                id\n                status\n                condition\n                comment\n            }\n            deadline\n            assignee {\n                username\n                role\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation editTestcase($input: UpdateTestcaseInput!) {\n        updateTestcase(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation editTestcase($input: UpdateTestcaseInput!) {\n        updateTestcase(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation editTestcaseForQA($input: UpdateTestcaseForQAInput!) {\n        updateTestcaseForQA(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation editTestcaseForQA($input: UpdateTestcaseForQAInput!) {\n        updateTestcaseForQA(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation addCommentForStep($input: UpdateStepForQAInput!) {\n        updateStepForQA(input: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation addCommentForStep($input: UpdateStepForQAInput!) {\n        updateStepForQA(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAssignedTestcasesForList {\n        getAssignedTestcases {\n            id\n            status {\n                value\n            }\n            testplan {\n                id\n            }\n            assignee {\n                username\n            }\n            deadline\n            steps {\n                status\n            }\n        }\n    }\n"): (typeof documents)["\n    query getAssignedTestcasesForList {\n        getAssignedTestcases {\n            id\n            status {\n                value\n            }\n            testplan {\n                id\n            }\n            assignee {\n                username\n            }\n            deadline\n            steps {\n                status\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTestplansForList {\n        getTestplans {\n            id\n            testcases {\n                id\n                status {\n                    value\n                }\n                testplan {\n                    id\n                }\n                assignee {\n                    username\n                }\n                deadline\n                steps {\n                    status\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query getTestplansForList {\n        getTestplans {\n            id\n            testcases {\n                id\n                status {\n                    value\n                }\n                testplan {\n                    id\n                }\n                assignee {\n                    username\n                }\n                deadline\n                steps {\n                    status\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getMe {\n        getMe {\n            username\n            role\n        }\n    }\n"): (typeof documents)["\n    query getMe {\n        getMe {\n            username\n            role\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation signIn($username: String!) {\n        signIn(username: $username)\n    }\n"): (typeof documents)["\n    mutation signIn($username: String!) {\n        signIn(username: $username)\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;