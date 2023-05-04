import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateStepInput: CreateStepInput;
  CreateTestcaseInput: CreateTestcaseInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Step: ResolverTypeWrapper<Step>;
  StepStatus: StepStatus;
  String: ResolverTypeWrapper<Scalars['String']>;
  Testcase: ResolverTypeWrapper<Testcase>;
  TestcaseStatus: TestcaseStatus;
  TestcaseStatusField: ResolverTypeWrapper<TestcaseStatusField>;
  Testplan: ResolverTypeWrapper<Testplan>;
  UpdateStepForQAInput: UpdateStepForQaInput;
  UpdateTestcaseForQAInput: UpdateTestcaseForQaInput;
  UpdateTestcaseInput: UpdateTestcaseInput;
  User: ResolverTypeWrapper<User>;
  UserRole: UserRole;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CreateStepInput: CreateStepInput;
  CreateTestcaseInput: CreateTestcaseInput;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Step: Step;
  String: Scalars['String'];
  Testcase: Testcase;
  TestcaseStatusField: TestcaseStatusField;
  Testplan: Testplan;
  UpdateStepForQAInput: UpdateStepForQaInput;
  UpdateTestcaseForQAInput: UpdateTestcaseForQaInput;
  UpdateTestcaseInput: UpdateTestcaseInput;
  User: User;
}>;

export type RoleDirectiveArgs = {
  roles?: Maybe<Array<UserRole>>;
};

export type RoleDirectiveResolver<Result, Parent, ContextType = any, Args = RoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createStep?: Resolver<ResolversTypes['Step'], ParentType, ContextType, RequireFields<MutationCreateStepArgs, 'input'>>;
  createTestcase?: Resolver<ResolversTypes['Testcase'], ParentType, ContextType, RequireFields<MutationCreateTestcaseArgs, 'input'>>;
  createTestplan?: Resolver<ResolversTypes['Testplan'], ParentType, ContextType, RequireFields<MutationCreateTestplanArgs, 'id'>>;
  signIn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'username'>>;
  updateStepForQA?: Resolver<ResolversTypes['Step'], ParentType, ContextType, RequireFields<MutationUpdateStepForQaArgs, 'input'>>;
  updateTestcase?: Resolver<ResolversTypes['Testcase'], ParentType, ContextType, RequireFields<MutationUpdateTestcaseArgs, 'input'>>;
  updateTestcaseForQA?: Resolver<ResolversTypes['Testcase'], ParentType, ContextType, RequireFields<MutationUpdateTestcaseForQaArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAssignedTestcases?: Resolver<Maybe<Array<ResolversTypes['Testcase']>>, ParentType, ContextType>;
  getMe?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  getStepById?: Resolver<Maybe<ResolversTypes['Step']>, ParentType, ContextType, RequireFields<QueryGetStepByIdArgs, 'id'>>;
  getTestcaseById?: Resolver<Maybe<ResolversTypes['Testcase']>, ParentType, ContextType, RequireFields<QueryGetTestcaseByIdArgs, 'id'>>;
  getTestplanById?: Resolver<Maybe<ResolversTypes['Testplan']>, ParentType, ContextType, RequireFields<QueryGetTestplanByIdArgs, 'id'>>;
  getTestplans?: Resolver<Maybe<Array<ResolversTypes['Testplan']>>, ParentType, ContextType>;
}>;

export type StepResolvers<ContextType = any, ParentType extends ResolversParentTypes['Step'] = ResolversParentTypes['Step']> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['StepStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TestcaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Testcase'] = ResolversParentTypes['Testcase']> = ResolversObject<{
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postcondition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  precondition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TestcaseStatusField']>, ParentType, ContextType>;
  steps?: Resolver<Maybe<Array<ResolversTypes['Step']>>, ParentType, ContextType>;
  testplan?: Resolver<Maybe<ResolversTypes['Testplan']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TestcaseStatusFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestcaseStatusField'] = ResolversParentTypes['TestcaseStatusField']> = ResolversObject<{
  value?: Resolver<ResolversTypes['TestcaseStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TestplanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Testplan'] = ResolversParentTypes['Testplan']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testcases?: Resolver<Maybe<Array<ResolversTypes['Testcase']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Step?: StepResolvers<ContextType>;
  Testcase?: TestcaseResolvers<ContextType>;
  TestcaseStatusField?: TestcaseStatusFieldResolvers<ContextType>;
  Testplan?: TestplanResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  role?: RoleDirectiveResolver<any, any, ContextType>;
}>;
