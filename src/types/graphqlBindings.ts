/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users: <T = Array<User | null>>(
        args: {
            where?: UserWhereInput | null
            orderBy?: UserOrderByInput | null
            skip?: Int | null
            after?: string | null
            before?: string | null
            first?: Int | null
            last?: Int | null
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    posts: <T = Array<Post | null>>(
        args: {
            where?: PostWhereInput | null
            orderBy?: PostOrderByInput | null
            skip?: Int | null
            after?: string | null
            before?: string | null
            first?: Int | null
            last?: Int | null
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    comments: <T = Array<Comment | null>>(
        args: {
            where?: CommentWhereInput | null
            orderBy?: CommentOrderByInput | null
            skip?: Int | null
            after?: string | null
            before?: string | null
            first?: Int | null
            last?: Int | null
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    user: <T = User | null>(
        args: { where: UserWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    post: <T = Post | null>(
        args: { where: PostWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    comment: <T = Comment | null>(
        args: { where: CommentWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    usersConnection: <T = UserConnection>(
        args: {
            where?: UserWhereInput | null
            orderBy?: UserOrderByInput | null
            skip?: Int | null
            after?: string | null
            before?: string | null
            first?: Int | null
            last?: Int | null
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    postsConnection: <T = PostConnection>(
        args: {
            where?: PostWhereInput | null
            orderBy?: PostOrderByInput | null
            skip?: Int | null
            after?: string | null
            before?: string | null
            first?: Int | null
            last?: Int | null
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    commentsConnection: <T = CommentConnection>(
        args: {
            where?: CommentWhereInput | null
            orderBy?: CommentOrderByInput | null
            skip?: Int | null
            after?: string | null
            before?: string | null
            first?: Int | null
            last?: Int | null
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    node: <T = Node | null>(
        args: { id: ID_Output },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
}

export interface Mutation {
    createUser: <T = User>(
        args: { data: UserCreateInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    createPost: <T = Post>(
        args: { data: PostCreateInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    createComment: <T = Comment>(
        args: { data: CommentCreateInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    updateUser: <T = User | null>(
        args: { data: UserUpdateInput; where: UserWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    updatePost: <T = Post | null>(
        args: { data: PostUpdateInput; where: PostWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    updateComment: <T = Comment | null>(
        args: { data: CommentUpdateInput; where: CommentWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    deleteUser: <T = User | null>(
        args: { where: UserWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    deletePost: <T = Post | null>(
        args: { where: PostWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    deleteComment: <T = Comment | null>(
        args: { where: CommentWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T | null>
    upsertUser: <T = User>(
        args: {
            where: UserWhereUniqueInput
            create: UserCreateInput
            update: UserUpdateInput
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    upsertPost: <T = Post>(
        args: {
            where: PostWhereUniqueInput
            create: PostCreateInput
            update: PostUpdateInput
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    upsertComment: <T = Comment>(
        args: {
            where: CommentWhereUniqueInput
            create: CommentCreateInput
            update: CommentUpdateInput
        },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    updateManyUsers: <T = BatchPayload>(
        args: { data: UserUpdateManyMutationInput; where?: UserWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    updateManyPosts: <T = BatchPayload>(
        args: { data: PostUpdateManyMutationInput; where?: PostWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    updateManyComments: <T = BatchPayload>(
        args: { data: CommentUpdateManyMutationInput; where?: CommentWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    deleteManyUsers: <T = BatchPayload>(
        args: { where?: UserWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    deleteManyPosts: <T = BatchPayload>(
        args: { where?: PostWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    deleteManyComments: <T = BatchPayload>(
        args: { where?: CommentWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
    executeRaw: <T = Json>(
        args: { database?: PrismaDatabase | null; query: string },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<T>
}

export interface Subscription {
    user: <T = UserSubscriptionPayload | null>(
        args: { where?: UserSubscriptionWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<AsyncIterator<T | null>>
    post: <T = PostSubscriptionPayload | null>(
        args: { where?: PostSubscriptionWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<AsyncIterator<T | null>>
    comment: <T = CommentSubscriptionPayload | null>(
        args: { where?: CommentSubscriptionWhereInput | null },
        info?: GraphQLResolveInfo | string,
        options?: Options,
    ) => Promise<AsyncIterator<T | null>>
}

export interface Exists {
    User: (where?: UserWhereInput) => Promise<boolean>
    Post: (where?: PostWhereInput) => Promise<boolean>
    Comment: (where?: CommentWhereInput) => Promise<boolean>
}

export interface Prisma {
    query: Query
    mutation: Mutation
    subscription: Subscription
    exists: Exists
    request: <T = any>(query: string, variables?: { [key: string]: any }) => Promise<T>
    delegate(
        operation: 'query' | 'mutation',
        fieldName: string,
        args: {
            [key: string]: any
        },
        infoOrQuery?: GraphQLResolveInfo | string,
        options?: Options,
    ): Promise<any>
    delegateSubscription(
        fieldName: string,
        args?: {
            [key: string]: any
        },
        infoOrQuery?: GraphQLResolveInfo | string,
        options?: Options,
    ): Promise<AsyncIterator<any>>
    getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers
}

export interface BindingConstructor<T> {
    new (options: BasePrismaOptions): T
}
/**
 * Type Defs
 */

const typeDefs = `type AggregateComment {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Comment implements Node {
  id: ID!
  text: String!
  post: Post!
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime
}

"""A connection to a list of items."""
type CommentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  id: ID
  text: String!
  post: PostCreateOneWithoutCommentsInput!
  author: UserCreateOneWithoutCommentsInput!
}

input CommentCreateManyWithoutAuthorInput {
  create: [CommentCreateWithoutAuthorInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutAuthorInput {
  id: ID
  text: String!
  post: PostCreateOneWithoutCommentsInput!
}

input CommentCreateWithoutPostInput {
  id: ID
  text: String!
  author: UserCreateOneWithoutCommentsInput!
}

"""An edge in a connection."""
type CommentEdge {
  """The item at the end of the edge."""
  node: Comment!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  text: String!
  createdAt: DateTime!
  updatedAt: DateTime
}

input CommentScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
}

input CommentUpdateInput {
  text: String
  post: PostUpdateOneRequiredWithoutCommentsInput
  author: UserUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateManyDataInput {
  text: String
}

input CommentUpdateManyMutationInput {
  text: String
}

input CommentUpdateManyWithoutAuthorInput {
  create: [CommentCreateWithoutAuthorInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  delete: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutAuthorInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
  deleteMany: [CommentScalarWhereInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutAuthorInput!]
}

input CommentUpdateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  delete: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPostInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
  deleteMany: [CommentScalarWhereInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPostInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateWithoutAuthorDataInput {
  text: String
  post: PostUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateWithoutPostDataInput {
  text: String
  author: UserUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateWithWhereUniqueWithoutAuthorInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutAuthorDataInput!
}

input CommentUpdateWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPostDataInput!
}

input CommentUpsertWithWhereUniqueWithoutAuthorInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutAuthorDataInput!
  create: CommentCreateWithoutAuthorInput!
}

input CommentUpsertWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPostDataInput!
  create: CommentCreateWithoutPostInput!
}

input CommentWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  post: PostWhereInput
  author: UserWhereInput
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createPost(data: PostCreateInput!): Post!
  createComment(data: CommentCreateInput!): Comment!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  deleteUser(where: UserWhereUniqueInput!): User
  deletePost(where: PostWhereUniqueInput!): Post
  deleteComment(where: CommentWhereUniqueInput!): Comment
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  executeRaw(database: PrismaDatabase, query: String!): Json!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Post implements Node {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type PostConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  id: ID
  title: String!
  body: String!
  published: Boolean!
  author: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostInput
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateOneWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostCreateWithoutAuthorInput {
  id: ID
  title: String!
  body: String!
  published: Boolean!
  comments: CommentCreateManyWithoutPostInput
}

input PostCreateWithoutCommentsInput {
  id: ID
  title: String!
  body: String!
  published: Boolean!
  author: UserCreateOneWithoutPostsInput!
}

"""An edge in a connection."""
type PostEdge {
  """The item at the end of the edge."""
  node: Post!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  body_ASC
  body_DESC
  published_ASC
  published_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input PostScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [PostScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  body: String

  """All values that are not equal to given value."""
  body_not: String

  """All values that are contained in given list."""
  body_in: [String!]

  """All values that are not contained in given list."""
  body_not_in: [String!]

  """All values less than the given value."""
  body_lt: String

  """All values less than or equal the given value."""
  body_lte: String

  """All values greater than the given value."""
  body_gt: String

  """All values greater than or equal the given value."""
  body_gte: String

  """All values containing the given string."""
  body_contains: String

  """All values not containing the given string."""
  body_not_contains: String

  """All values starting with the given string."""
  body_starts_with: String

  """All values not starting with the given string."""
  body_not_starts_with: String

  """All values ending with the given string."""
  body_ends_with: String

  """All values not ending with the given string."""
  body_not_ends_with: String
  published: Boolean

  """All values that are not equal to given value."""
  published_not: Boolean
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PostSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PostWhereInput
}

input PostUpdateInput {
  title: String
  body: String
  published: Boolean
  author: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateManyDataInput {
  title: String
  body: String
  published: Boolean
}

input PostUpdateManyMutationInput {
  title: String
  body: String
  published: Boolean
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
  set: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
  deleteMany: [PostScalarWhereInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateOneRequiredWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
  update: PostUpdateWithoutCommentsDataInput
  upsert: PostUpsertWithoutCommentsInput
}

input PostUpdateWithoutAuthorDataInput {
  title: String
  body: String
  published: Boolean
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateWithoutCommentsDataInput {
  title: String
  body: String
  published: Boolean
  author: UserUpdateOneRequiredWithoutPostsInput
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithoutCommentsInput {
  update: PostUpdateWithoutCommentsDataInput!
  create: PostCreateWithoutCommentsInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  """Logical AND on all given filters."""
  AND: [PostWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  body: String

  """All values that are not equal to given value."""
  body_not: String

  """All values that are contained in given list."""
  body_in: [String!]

  """All values that are not contained in given list."""
  body_not_in: [String!]

  """All values less than the given value."""
  body_lt: String

  """All values less than or equal the given value."""
  body_lte: String

  """All values greater than the given value."""
  body_gt: String

  """All values greater than or equal the given value."""
  body_gte: String

  """All values containing the given string."""
  body_contains: String

  """All values not containing the given string."""
  body_not_contains: String

  """All values starting with the given string."""
  body_starts_with: String

  """All values not starting with the given string."""
  body_not_starts_with: String

  """All values ending with the given string."""
  body_ends_with: String

  """All values not ending with the given string."""
  body_not_ends_with: String
  published: Boolean

  """All values that are not equal to given value."""
  published_not: Boolean
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  author: UserWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
}

input PostWhereUniqueInput {
  id: ID
}

enum PrismaDatabase {
  default
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  user(where: UserWhereUniqueInput!): User
  post(where: PostWhereUniqueInput!): Post
  comment(where: CommentWhereUniqueInput!): Comment
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
}

type User implements Node {
  id: ID!
  name: String!
  email: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  email: String!
  posts: PostCreateManyWithoutAuthorInput
  comments: CommentCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsInput {
  id: ID
  name: String!
  email: String!
  posts: PostCreateManyWithoutAuthorInput
}

input UserCreateWithoutPostsInput {
  id: ID
  name: String!
  email: String!
  comments: CommentCreateManyWithoutAuthorInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  name: String
  email: String
  posts: PostUpdateManyWithoutAuthorInput
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  name: String
  email: String
}

input UserUpdateOneRequiredWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutCommentsDataInput
  upsert: UserUpsertWithoutCommentsInput
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
}

input UserUpdateWithoutCommentsDataInput {
  name: String
  email: String
  posts: PostUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutPostsDataInput {
  name: String
  email: String
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpsertWithoutCommentsInput {
  update: UserUpdateWithoutCommentsDataInput!
  create: UserCreateWithoutCommentsInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({ typeDefs })

/**
 * Types
 */

export type CommentOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'text_ASC'
    | 'text_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED'

export type PostOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'title_ASC'
    | 'title_DESC'
    | 'body_ASC'
    | 'body_DESC'
    | 'published_ASC'
    | 'published_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'

export type PrismaDatabase = 'default'

export type UserOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'email_ASC'
    | 'email_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'

export interface CommentCreateInput {
    id?: ID_Input | null
    text: string
    post: PostCreateOneWithoutCommentsInput
    author: UserCreateOneWithoutCommentsInput
}

export interface CommentCreateManyWithoutAuthorInput {
    create?: CommentCreateWithoutAuthorInput[] | CommentCreateWithoutAuthorInput | null
    connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
}

export interface CommentCreateManyWithoutPostInput {
    create?: CommentCreateWithoutPostInput[] | CommentCreateWithoutPostInput | null
    connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
}

export interface CommentCreateWithoutAuthorInput {
    id?: ID_Input | null
    text: string
    post: PostCreateOneWithoutCommentsInput
}

export interface CommentCreateWithoutPostInput {
    id?: ID_Input | null
    text: string
    author: UserCreateOneWithoutCommentsInput
}

export interface CommentScalarWhereInput {
    AND?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
    OR?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
    NOT?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
    id?: ID_Input | null
    id_not?: ID_Input | null
    id_in?: ID_Output[] | ID_Output | null
    id_not_in?: ID_Output[] | ID_Output | null
    id_lt?: ID_Input | null
    id_lte?: ID_Input | null
    id_gt?: ID_Input | null
    id_gte?: ID_Input | null
    id_contains?: ID_Input | null
    id_not_contains?: ID_Input | null
    id_starts_with?: ID_Input | null
    id_not_starts_with?: ID_Input | null
    id_ends_with?: ID_Input | null
    id_not_ends_with?: ID_Input | null
    text?: string | null
    text_not?: string | null
    text_in?: string[] | string | null
    text_not_in?: string[] | string | null
    text_lt?: string | null
    text_lte?: string | null
    text_gt?: string | null
    text_gte?: string | null
    text_contains?: string | null
    text_not_contains?: string | null
    text_starts_with?: string | null
    text_not_starts_with?: string | null
    text_ends_with?: string | null
    text_not_ends_with?: string | null
    createdAt?: DateTime | null
    createdAt_not?: DateTime | null
    createdAt_in?: DateTime[] | DateTime | null
    createdAt_not_in?: DateTime[] | DateTime | null
    createdAt_lt?: DateTime | null
    createdAt_lte?: DateTime | null
    createdAt_gt?: DateTime | null
    createdAt_gte?: DateTime | null
    updatedAt?: DateTime | null
    updatedAt_not?: DateTime | null
    updatedAt_in?: DateTime[] | DateTime | null
    updatedAt_not_in?: DateTime[] | DateTime | null
    updatedAt_lt?: DateTime | null
    updatedAt_lte?: DateTime | null
    updatedAt_gt?: DateTime | null
    updatedAt_gte?: DateTime | null
}

export interface CommentSubscriptionWhereInput {
    AND?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput | null
    OR?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput | null
    NOT?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput | null
    mutation_in?: MutationType[] | MutationType | null
    updatedFields_contains?: string | null
    updatedFields_contains_every?: string[] | string | null
    updatedFields_contains_some?: string[] | string | null
    node?: CommentWhereInput | null
}

export interface CommentUpdateInput {
    text?: string | null
    post?: PostUpdateOneRequiredWithoutCommentsInput | null
    author?: UserUpdateOneRequiredWithoutCommentsInput | null
}

export interface CommentUpdateManyDataInput {
    text?: string | null
}

export interface CommentUpdateManyMutationInput {
    text?: string | null
}

export interface CommentUpdateManyWithoutAuthorInput {
    create?: CommentCreateWithoutAuthorInput[] | CommentCreateWithoutAuthorInput | null
    connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    set?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    disconnect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    delete?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    update?:
        | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
        | CommentUpdateWithWhereUniqueWithoutAuthorInput
        | null
    updateMany?:
        | CommentUpdateManyWithWhereNestedInput[]
        | CommentUpdateManyWithWhereNestedInput
        | null
    deleteMany?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
    upsert?:
        | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
        | CommentUpsertWithWhereUniqueWithoutAuthorInput
        | null
}

export interface CommentUpdateManyWithoutPostInput {
    create?: CommentCreateWithoutPostInput[] | CommentCreateWithoutPostInput | null
    connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    set?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    disconnect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    delete?: CommentWhereUniqueInput[] | CommentWhereUniqueInput | null
    update?:
        | CommentUpdateWithWhereUniqueWithoutPostInput[]
        | CommentUpdateWithWhereUniqueWithoutPostInput
        | null
    updateMany?:
        | CommentUpdateManyWithWhereNestedInput[]
        | CommentUpdateManyWithWhereNestedInput
        | null
    deleteMany?: CommentScalarWhereInput[] | CommentScalarWhereInput | null
    upsert?:
        | CommentUpsertWithWhereUniqueWithoutPostInput[]
        | CommentUpsertWithWhereUniqueWithoutPostInput
        | null
}

export interface CommentUpdateManyWithWhereNestedInput {
    where: CommentScalarWhereInput
    data: CommentUpdateManyDataInput
}

export interface CommentUpdateWithoutAuthorDataInput {
    text?: string | null
    post?: PostUpdateOneRequiredWithoutCommentsInput | null
}

export interface CommentUpdateWithoutPostDataInput {
    text?: string | null
    author?: UserUpdateOneRequiredWithoutCommentsInput | null
}

export interface CommentUpdateWithWhereUniqueWithoutAuthorInput {
    where: CommentWhereUniqueInput
    data: CommentUpdateWithoutAuthorDataInput
}

export interface CommentUpdateWithWhereUniqueWithoutPostInput {
    where: CommentWhereUniqueInput
    data: CommentUpdateWithoutPostDataInput
}

export interface CommentUpsertWithWhereUniqueWithoutAuthorInput {
    where: CommentWhereUniqueInput
    update: CommentUpdateWithoutAuthorDataInput
    create: CommentCreateWithoutAuthorInput
}

export interface CommentUpsertWithWhereUniqueWithoutPostInput {
    where: CommentWhereUniqueInput
    update: CommentUpdateWithoutPostDataInput
    create: CommentCreateWithoutPostInput
}

export interface CommentWhereInput {
    AND?: CommentWhereInput[] | CommentWhereInput | null
    OR?: CommentWhereInput[] | CommentWhereInput | null
    NOT?: CommentWhereInput[] | CommentWhereInput | null
    id?: ID_Input | null
    id_not?: ID_Input | null
    id_in?: ID_Output[] | ID_Output | null
    id_not_in?: ID_Output[] | ID_Output | null
    id_lt?: ID_Input | null
    id_lte?: ID_Input | null
    id_gt?: ID_Input | null
    id_gte?: ID_Input | null
    id_contains?: ID_Input | null
    id_not_contains?: ID_Input | null
    id_starts_with?: ID_Input | null
    id_not_starts_with?: ID_Input | null
    id_ends_with?: ID_Input | null
    id_not_ends_with?: ID_Input | null
    text?: string | null
    text_not?: string | null
    text_in?: string[] | string | null
    text_not_in?: string[] | string | null
    text_lt?: string | null
    text_lte?: string | null
    text_gt?: string | null
    text_gte?: string | null
    text_contains?: string | null
    text_not_contains?: string | null
    text_starts_with?: string | null
    text_not_starts_with?: string | null
    text_ends_with?: string | null
    text_not_ends_with?: string | null
    createdAt?: DateTime | null
    createdAt_not?: DateTime | null
    createdAt_in?: DateTime[] | DateTime | null
    createdAt_not_in?: DateTime[] | DateTime | null
    createdAt_lt?: DateTime | null
    createdAt_lte?: DateTime | null
    createdAt_gt?: DateTime | null
    createdAt_gte?: DateTime | null
    updatedAt?: DateTime | null
    updatedAt_not?: DateTime | null
    updatedAt_in?: DateTime[] | DateTime | null
    updatedAt_not_in?: DateTime[] | DateTime | null
    updatedAt_lt?: DateTime | null
    updatedAt_lte?: DateTime | null
    updatedAt_gt?: DateTime | null
    updatedAt_gte?: DateTime | null
    post?: PostWhereInput | null
    author?: UserWhereInput | null
}

export interface CommentWhereUniqueInput {
    id?: ID_Input | null
}

export interface PostCreateInput {
    id?: ID_Input | null
    title: string
    body: string
    published: boolean
    author: UserCreateOneWithoutPostsInput
    comments?: CommentCreateManyWithoutPostInput | null
}

export interface PostCreateManyWithoutAuthorInput {
    create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput | null
    connect?: PostWhereUniqueInput[] | PostWhereUniqueInput | null
}

export interface PostCreateOneWithoutCommentsInput {
    create?: PostCreateWithoutCommentsInput | null
    connect?: PostWhereUniqueInput | null
}

export interface PostCreateWithoutAuthorInput {
    id?: ID_Input | null
    title: string
    body: string
    published: boolean
    comments?: CommentCreateManyWithoutPostInput | null
}

export interface PostCreateWithoutCommentsInput {
    id?: ID_Input | null
    title: string
    body: string
    published: boolean
    author: UserCreateOneWithoutPostsInput
}

export interface PostScalarWhereInput {
    AND?: PostScalarWhereInput[] | PostScalarWhereInput | null
    OR?: PostScalarWhereInput[] | PostScalarWhereInput | null
    NOT?: PostScalarWhereInput[] | PostScalarWhereInput | null
    id?: ID_Input | null
    id_not?: ID_Input | null
    id_in?: ID_Output[] | ID_Output | null
    id_not_in?: ID_Output[] | ID_Output | null
    id_lt?: ID_Input | null
    id_lte?: ID_Input | null
    id_gt?: ID_Input | null
    id_gte?: ID_Input | null
    id_contains?: ID_Input | null
    id_not_contains?: ID_Input | null
    id_starts_with?: ID_Input | null
    id_not_starts_with?: ID_Input | null
    id_ends_with?: ID_Input | null
    id_not_ends_with?: ID_Input | null
    title?: string | null
    title_not?: string | null
    title_in?: string[] | string | null
    title_not_in?: string[] | string | null
    title_lt?: string | null
    title_lte?: string | null
    title_gt?: string | null
    title_gte?: string | null
    title_contains?: string | null
    title_not_contains?: string | null
    title_starts_with?: string | null
    title_not_starts_with?: string | null
    title_ends_with?: string | null
    title_not_ends_with?: string | null
    body?: string | null
    body_not?: string | null
    body_in?: string[] | string | null
    body_not_in?: string[] | string | null
    body_lt?: string | null
    body_lte?: string | null
    body_gt?: string | null
    body_gte?: string | null
    body_contains?: string | null
    body_not_contains?: string | null
    body_starts_with?: string | null
    body_not_starts_with?: string | null
    body_ends_with?: string | null
    body_not_ends_with?: string | null
    published?: boolean | null
    published_not?: boolean | null
    createdAt?: DateTime | null
    createdAt_not?: DateTime | null
    createdAt_in?: DateTime[] | DateTime | null
    createdAt_not_in?: DateTime[] | DateTime | null
    createdAt_lt?: DateTime | null
    createdAt_lte?: DateTime | null
    createdAt_gt?: DateTime | null
    createdAt_gte?: DateTime | null
    updatedAt?: DateTime | null
    updatedAt_not?: DateTime | null
    updatedAt_in?: DateTime[] | DateTime | null
    updatedAt_not_in?: DateTime[] | DateTime | null
    updatedAt_lt?: DateTime | null
    updatedAt_lte?: DateTime | null
    updatedAt_gt?: DateTime | null
    updatedAt_gte?: DateTime | null
}

export interface PostSubscriptionWhereInput {
    AND?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput | null
    OR?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput | null
    NOT?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput | null
    mutation_in?: MutationType[] | MutationType | null
    updatedFields_contains?: string | null
    updatedFields_contains_every?: string[] | string | null
    updatedFields_contains_some?: string[] | string | null
    node?: PostWhereInput | null
}

export interface PostUpdateInput {
    title?: string | null
    body?: string | null
    published?: boolean | null
    author?: UserUpdateOneRequiredWithoutPostsInput | null
    comments?: CommentUpdateManyWithoutPostInput | null
}

export interface PostUpdateManyDataInput {
    title?: string | null
    body?: string | null
    published?: boolean | null
}

export interface PostUpdateManyMutationInput {
    title?: string | null
    body?: string | null
    published?: boolean | null
}

export interface PostUpdateManyWithoutAuthorInput {
    create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput | null
    connect?: PostWhereUniqueInput[] | PostWhereUniqueInput | null
    set?: PostWhereUniqueInput[] | PostWhereUniqueInput | null
    disconnect?: PostWhereUniqueInput[] | PostWhereUniqueInput | null
    delete?: PostWhereUniqueInput[] | PostWhereUniqueInput | null
    update?:
        | PostUpdateWithWhereUniqueWithoutAuthorInput[]
        | PostUpdateWithWhereUniqueWithoutAuthorInput
        | null
    updateMany?:
        | PostUpdateManyWithWhereNestedInput[]
        | PostUpdateManyWithWhereNestedInput
        | null
    deleteMany?: PostScalarWhereInput[] | PostScalarWhereInput | null
    upsert?:
        | PostUpsertWithWhereUniqueWithoutAuthorInput[]
        | PostUpsertWithWhereUniqueWithoutAuthorInput
        | null
}

export interface PostUpdateManyWithWhereNestedInput {
    where: PostScalarWhereInput
    data: PostUpdateManyDataInput
}

export interface PostUpdateOneRequiredWithoutCommentsInput {
    create?: PostCreateWithoutCommentsInput | null
    connect?: PostWhereUniqueInput | null
    update?: PostUpdateWithoutCommentsDataInput | null
    upsert?: PostUpsertWithoutCommentsInput | null
}

export interface PostUpdateWithoutAuthorDataInput {
    title?: string | null
    body?: string | null
    published?: boolean | null
    comments?: CommentUpdateManyWithoutPostInput | null
}

export interface PostUpdateWithoutCommentsDataInput {
    title?: string | null
    body?: string | null
    published?: boolean | null
    author?: UserUpdateOneRequiredWithoutPostsInput | null
}

export interface PostUpdateWithWhereUniqueWithoutAuthorInput {
    where: PostWhereUniqueInput
    data: PostUpdateWithoutAuthorDataInput
}

export interface PostUpsertWithoutCommentsInput {
    update: PostUpdateWithoutCommentsDataInput
    create: PostCreateWithoutCommentsInput
}

export interface PostUpsertWithWhereUniqueWithoutAuthorInput {
    where: PostWhereUniqueInput
    update: PostUpdateWithoutAuthorDataInput
    create: PostCreateWithoutAuthorInput
}

export interface PostWhereInput {
    AND?: PostWhereInput[] | PostWhereInput | null
    OR?: PostWhereInput[] | PostWhereInput | null
    NOT?: PostWhereInput[] | PostWhereInput | null
    id?: ID_Input | null
    id_not?: ID_Input | null
    id_in?: ID_Output[] | ID_Output | null
    id_not_in?: ID_Output[] | ID_Output | null
    id_lt?: ID_Input | null
    id_lte?: ID_Input | null
    id_gt?: ID_Input | null
    id_gte?: ID_Input | null
    id_contains?: ID_Input | null
    id_not_contains?: ID_Input | null
    id_starts_with?: ID_Input | null
    id_not_starts_with?: ID_Input | null
    id_ends_with?: ID_Input | null
    id_not_ends_with?: ID_Input | null
    title?: string | null
    title_not?: string | null
    title_in?: string[] | string | null
    title_not_in?: string[] | string | null
    title_lt?: string | null
    title_lte?: string | null
    title_gt?: string | null
    title_gte?: string | null
    title_contains?: string | null
    title_not_contains?: string | null
    title_starts_with?: string | null
    title_not_starts_with?: string | null
    title_ends_with?: string | null
    title_not_ends_with?: string | null
    body?: string | null
    body_not?: string | null
    body_in?: string[] | string | null
    body_not_in?: string[] | string | null
    body_lt?: string | null
    body_lte?: string | null
    body_gt?: string | null
    body_gte?: string | null
    body_contains?: string | null
    body_not_contains?: string | null
    body_starts_with?: string | null
    body_not_starts_with?: string | null
    body_ends_with?: string | null
    body_not_ends_with?: string | null
    published?: boolean | null
    published_not?: boolean | null
    createdAt?: DateTime | null
    createdAt_not?: DateTime | null
    createdAt_in?: DateTime[] | DateTime | null
    createdAt_not_in?: DateTime[] | DateTime | null
    createdAt_lt?: DateTime | null
    createdAt_lte?: DateTime | null
    createdAt_gt?: DateTime | null
    createdAt_gte?: DateTime | null
    updatedAt?: DateTime | null
    updatedAt_not?: DateTime | null
    updatedAt_in?: DateTime[] | DateTime | null
    updatedAt_not_in?: DateTime[] | DateTime | null
    updatedAt_lt?: DateTime | null
    updatedAt_lte?: DateTime | null
    updatedAt_gt?: DateTime | null
    updatedAt_gte?: DateTime | null
    author?: UserWhereInput | null
    comments_every?: CommentWhereInput | null
    comments_some?: CommentWhereInput | null
    comments_none?: CommentWhereInput | null
}

export interface PostWhereUniqueInput {
    id?: ID_Input | null
}

export interface UserCreateInput {
    id?: ID_Input | null
    name: string
    email: string
    posts?: PostCreateManyWithoutAuthorInput | null
    comments?: CommentCreateManyWithoutAuthorInput | null
}

export interface UserCreateOneWithoutCommentsInput {
    create?: UserCreateWithoutCommentsInput | null
    connect?: UserWhereUniqueInput | null
}

export interface UserCreateOneWithoutPostsInput {
    create?: UserCreateWithoutPostsInput | null
    connect?: UserWhereUniqueInput | null
}

export interface UserCreateWithoutCommentsInput {
    id?: ID_Input | null
    name: string
    email: string
    posts?: PostCreateManyWithoutAuthorInput | null
}

export interface UserCreateWithoutPostsInput {
    id?: ID_Input | null
    name: string
    email: string
    comments?: CommentCreateManyWithoutAuthorInput | null
}

export interface UserSubscriptionWhereInput {
    AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput | null
    OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput | null
    NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput | null
    mutation_in?: MutationType[] | MutationType | null
    updatedFields_contains?: string | null
    updatedFields_contains_every?: string[] | string | null
    updatedFields_contains_some?: string[] | string | null
    node?: UserWhereInput | null
}

export interface UserUpdateInput {
    name?: string | null
    email?: string | null
    posts?: PostUpdateManyWithoutAuthorInput | null
    comments?: CommentUpdateManyWithoutAuthorInput | null
}

export interface UserUpdateManyMutationInput {
    name?: string | null
    email?: string | null
}

export interface UserUpdateOneRequiredWithoutCommentsInput {
    create?: UserCreateWithoutCommentsInput | null
    connect?: UserWhereUniqueInput | null
    update?: UserUpdateWithoutCommentsDataInput | null
    upsert?: UserUpsertWithoutCommentsInput | null
}

export interface UserUpdateOneRequiredWithoutPostsInput {
    create?: UserCreateWithoutPostsInput | null
    connect?: UserWhereUniqueInput | null
    update?: UserUpdateWithoutPostsDataInput | null
    upsert?: UserUpsertWithoutPostsInput | null
}

export interface UserUpdateWithoutCommentsDataInput {
    name?: string | null
    email?: string | null
    posts?: PostUpdateManyWithoutAuthorInput | null
}

export interface UserUpdateWithoutPostsDataInput {
    name?: string | null
    email?: string | null
    comments?: CommentUpdateManyWithoutAuthorInput | null
}

export interface UserUpsertWithoutCommentsInput {
    update: UserUpdateWithoutCommentsDataInput
    create: UserCreateWithoutCommentsInput
}

export interface UserUpsertWithoutPostsInput {
    update: UserUpdateWithoutPostsDataInput
    create: UserCreateWithoutPostsInput
}

export interface UserWhereInput {
    AND?: UserWhereInput[] | UserWhereInput | null
    OR?: UserWhereInput[] | UserWhereInput | null
    NOT?: UserWhereInput[] | UserWhereInput | null
    id?: ID_Input | null
    id_not?: ID_Input | null
    id_in?: ID_Output[] | ID_Output | null
    id_not_in?: ID_Output[] | ID_Output | null
    id_lt?: ID_Input | null
    id_lte?: ID_Input | null
    id_gt?: ID_Input | null
    id_gte?: ID_Input | null
    id_contains?: ID_Input | null
    id_not_contains?: ID_Input | null
    id_starts_with?: ID_Input | null
    id_not_starts_with?: ID_Input | null
    id_ends_with?: ID_Input | null
    id_not_ends_with?: ID_Input | null
    name?: string | null
    name_not?: string | null
    name_in?: string[] | string | null
    name_not_in?: string[] | string | null
    name_lt?: string | null
    name_lte?: string | null
    name_gt?: string | null
    name_gte?: string | null
    name_contains?: string | null
    name_not_contains?: string | null
    name_starts_with?: string | null
    name_not_starts_with?: string | null
    name_ends_with?: string | null
    name_not_ends_with?: string | null
    email?: string | null
    email_not?: string | null
    email_in?: string[] | string | null
    email_not_in?: string[] | string | null
    email_lt?: string | null
    email_lte?: string | null
    email_gt?: string | null
    email_gte?: string | null
    email_contains?: string | null
    email_not_contains?: string | null
    email_starts_with?: string | null
    email_not_starts_with?: string | null
    email_ends_with?: string | null
    email_not_ends_with?: string | null
    createdAt?: DateTime | null
    createdAt_not?: DateTime | null
    createdAt_in?: DateTime[] | DateTime | null
    createdAt_not_in?: DateTime[] | DateTime | null
    createdAt_lt?: DateTime | null
    createdAt_lte?: DateTime | null
    createdAt_gt?: DateTime | null
    createdAt_gte?: DateTime | null
    updatedAt?: DateTime | null
    updatedAt_not?: DateTime | null
    updatedAt_in?: DateTime[] | DateTime | null
    updatedAt_not_in?: DateTime[] | DateTime | null
    updatedAt_lt?: DateTime | null
    updatedAt_lte?: DateTime | null
    updatedAt_gt?: DateTime | null
    updatedAt_gte?: DateTime | null
    posts_every?: PostWhereInput | null
    posts_some?: PostWhereInput | null
    posts_none?: PostWhereInput | null
    comments_every?: CommentWhereInput | null
    comments_some?: CommentWhereInput | null
    comments_none?: CommentWhereInput | null
}

export interface UserWhereUniqueInput {
    id?: ID_Input | null
    email?: string | null
}

/*
 * An object with an ID

 */
export interface Node {
    id: ID_Output
}

export interface AggregateComment {
    count: Int
}

export interface AggregatePost {
    count: Int
}

export interface AggregateUser {
    count: Int
}

export interface BatchPayload {
    count: Long
}

export interface Comment extends Node {
    id: ID_Output
    text: string
    post: Post
    author: User
    createdAt: DateTime
    updatedAt?: DateTime | null
}

/*
 * A connection to a list of items.

 */
export interface CommentConnection {
    pageInfo: PageInfo
    edges: Array<CommentEdge | null>
    aggregate: AggregateComment
}

/*
 * An edge in a connection.

 */
export interface CommentEdge {
    node: Comment
    cursor: string
}

export interface CommentPreviousValues {
    id: ID_Output
    text: string
    createdAt: DateTime
    updatedAt?: DateTime | null
}

export interface CommentSubscriptionPayload {
    mutation: MutationType
    node?: Comment | null
    updatedFields?: Array<string> | null
    previousValues?: CommentPreviousValues | null
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor?: string | null
    endCursor?: string | null
}

export interface Post extends Node {
    id: ID_Output
    title: string
    body: string
    published: boolean
    author: User
    comments?: Array<Comment> | null
    createdAt: DateTime
    updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface PostConnection {
    pageInfo: PageInfo
    edges: Array<PostEdge | null>
    aggregate: AggregatePost
}

/*
 * An edge in a connection.

 */
export interface PostEdge {
    node: Post
    cursor: string
}

export interface PostPreviousValues {
    id: ID_Output
    title: string
    body: string
    published: boolean
    createdAt: DateTime
    updatedAt: DateTime
}

export interface PostSubscriptionPayload {
    mutation: MutationType
    node?: Post | null
    updatedFields?: Array<string> | null
    previousValues?: PostPreviousValues | null
}

export interface User extends Node {
    id: ID_Output
    name: string
    email: string
    posts?: Array<Post> | null
    comments?: Array<Comment> | null
    createdAt: DateTime
    updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
    pageInfo: PageInfo
    edges: Array<UserEdge | null>
    aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
    node: User
    cursor: string
}

export interface UserPreviousValues {
    id: ID_Output
    name: string
    email: string
    createdAt: DateTime
    updatedAt: DateTime
}

export interface UserSubscriptionPayload {
    mutation: MutationType
    node?: User | null
    updatedFields?: Array<string> | null
    previousValues?: UserPreviousValues | null
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export type DateTime = Date | string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
Raw JSON value
*/
export type Json = any

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string
