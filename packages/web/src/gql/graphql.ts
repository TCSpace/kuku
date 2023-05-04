/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateStepInput = {
  comment?: InputMaybe<Scalars['String']>;
  condition?: InputMaybe<Scalars['String']>;
  testcaseId: Scalars['Int'];
};

export type CreateTestcaseInput = {
  assignee?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
  postcondition?: InputMaybe<Scalars['String']>;
  precondition?: InputMaybe<Scalars['String']>;
  testplanId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createStep: Step;
  createTestcase: Testcase;
  createTestplan: Testplan;
  signIn?: Maybe<Scalars['String']>;
  updateStepForQA: Step;
  updateTestcase: Testcase;
  updateTestcaseForQA: Testcase;
};


export type MutationCreateStepArgs = {
  input: CreateStepInput;
};


export type MutationCreateTestcaseArgs = {
  input: CreateTestcaseInput;
};


export type MutationCreateTestplanArgs = {
  id: Scalars['String'];
};


export type MutationSignInArgs = {
  username: Scalars['String'];
};


export type MutationUpdateStepForQaArgs = {
  input: UpdateStepForQaInput;
};


export type MutationUpdateTestcaseArgs = {
  input: UpdateTestcaseInput;
};


export type MutationUpdateTestcaseForQaArgs = {
  input: UpdateTestcaseForQaInput;
};

export type Query = {
  __typename?: 'Query';
  getAssignedTestcases?: Maybe<Array<Testcase>>;
  getMe: User;
  getStepById?: Maybe<Step>;
  getTestcaseById?: Maybe<Testcase>;
  getTestplanById?: Maybe<Testplan>;
  getTestplans?: Maybe<Array<Testplan>>;
};


export type QueryGetStepByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetTestcaseByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetTestplanByIdArgs = {
  id: Scalars['String'];
};

export type Step = {
  __typename?: 'Step';
  comment?: Maybe<Scalars['String']>;
  condition?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  status?: Maybe<StepStatus>;
};

export enum StepStatus {
  Failure = 'FAILURE',
  InProgress = 'IN_PROGRESS',
  Success = 'SUCCESS'
}

export type Testcase = {
  __typename?: 'Testcase';
  assignee?: Maybe<User>;
  comment?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  postcondition?: Maybe<Scalars['String']>;
  precondition?: Maybe<Scalars['String']>;
  status?: Maybe<TestcaseStatusField>;
  steps?: Maybe<Array<Step>>;
  testplan?: Maybe<Testplan>;
};

export enum TestcaseStatus {
  Failure = 'FAILURE',
  InProgress = 'IN_PROGRESS',
  Success = 'SUCCESS'
}

export type TestcaseStatusField = {
  __typename?: 'TestcaseStatusField';
  value: TestcaseStatus;
};

export type Testplan = {
  __typename?: 'Testplan';
  id: Scalars['String'];
  testcases?: Maybe<Array<Testcase>>;
};

export type UpdateStepForQaInput = {
  comment?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StepStatus>;
  stepId: Scalars['Int'];
};

export type UpdateTestcaseForQaInput = {
  comment?: InputMaybe<Scalars['String']>;
  testcaseId: Scalars['Int'];
};

export type UpdateTestcaseInput = {
  assignee?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
  postcondition?: InputMaybe<Scalars['String']>;
  precondition?: InputMaybe<Scalars['String']>;
  testcaseId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  role: UserRole;
  username: Scalars['String'];
};

export enum UserRole {
  Analyst = 'ANALYST',
  Manager = 'MANAGER',
  Qa = 'QA'
}

export type GetTestcaseForPageQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTestcaseForPageQuery = { __typename?: 'Query', getTestcaseById?: { __typename?: 'Testcase', id: number, precondition?: string | null, postcondition?: string | null, comment?: string | null, deadline?: string | null, testplan?: { __typename?: 'Testplan', id: string } | null, status?: { __typename?: 'TestcaseStatusField', value: TestcaseStatus } | null, steps?: Array<{ __typename?: 'Step', id: number, status?: StepStatus | null, condition?: string | null, comment?: string | null }> | null, assignee?: { __typename?: 'User', username: string, role: UserRole } | null } | null };

export type EditTestcaseMutationVariables = Exact<{
  input: UpdateTestcaseInput;
}>;


export type EditTestcaseMutation = { __typename?: 'Mutation', updateTestcase: { __typename?: 'Testcase', id: number } };

export type EditTestcaseForQaMutationVariables = Exact<{
  input: UpdateTestcaseForQaInput;
}>;


export type EditTestcaseForQaMutation = { __typename?: 'Mutation', updateTestcaseForQA: { __typename?: 'Testcase', id: number } };

export type GetAssignedTestcasesForListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssignedTestcasesForListQuery = { __typename?: 'Query', getAssignedTestcases?: Array<{ __typename?: 'Testcase', id: number, deadline?: string | null, status?: { __typename?: 'TestcaseStatusField', value: TestcaseStatus } | null, testplan?: { __typename?: 'Testplan', id: string } | null, assignee?: { __typename?: 'User', username: string } | null, steps?: Array<{ __typename?: 'Step', status?: StepStatus | null }> | null }> | null };

export type GetTestplansForListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTestplansForListQuery = { __typename?: 'Query', getTestplans?: Array<{ __typename?: 'Testplan', id: string, testcases?: Array<{ __typename?: 'Testcase', id: number, deadline?: string | null, status?: { __typename?: 'TestcaseStatusField', value: TestcaseStatus } | null, testplan?: { __typename?: 'Testplan', id: string } | null, assignee?: { __typename?: 'User', username: string } | null, steps?: Array<{ __typename?: 'Step', status?: StepStatus | null }> | null }> | null }> | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'User', username: string, role: UserRole } };

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: string | null };


export const GetTestcaseForPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestcaseForPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestcaseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"testplan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"precondition"}},{"kind":"Field","name":{"kind":"Name","value":"postcondition"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestcaseForPageQuery, GetTestcaseForPageQueryVariables>;
export const EditTestcaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editTestcase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTestcaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTestcase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EditTestcaseMutation, EditTestcaseMutationVariables>;
export const EditTestcaseForQaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editTestcaseForQA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTestcaseForQAInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTestcaseForQA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EditTestcaseForQaMutation, EditTestcaseForQaMutationVariables>;
export const GetAssignedTestcasesForListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAssignedTestcasesForList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAssignedTestcases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"testplan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetAssignedTestcasesForListQuery, GetAssignedTestcasesForListQueryVariables>;
export const GetTestplansForListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestplansForList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestplans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"testcases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"testplan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTestplansForListQuery, GetTestplansForListQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;