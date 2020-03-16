import { PubSub } from "graphql-yoga"
import { Prisma } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export type User = {
  id: string,
  name: string,
  email: string,
  password: string
}
export type Post = {
  id: string,
  title: string,
  body: string,
  published: boolean,
  author: string
}
export type Comment = {
  id: string,
  text: string,
  author: string,
  post: string
}

export type DB = {
  users: User[],
  posts: Post[],
  comments: Comment[]
}

// type ResolverFunction = (parent: any, args: any, context: Context, info: any) => any
export interface AuthorizationPayload extends Object {
  user: User,
  token: string
}

export type Context = { db: DB, pubsub: PubSub, prisma: Prisma }

export type DynamicObject = {
  [key: string]: any
}

export interface UserWhereUniqueInput {
  id?: String | null
  email?: String | null
}

export interface Exists {
  User: (where?: { id?: string, email?: string }) => Promise<boolean>
  Post: (where?: { id: string }) => Promise<boolean>
  Comment: (where: { id: string }) => Promise<boolean>
}

export interface AppMutation {
  login: (parent: undefined, args: { email: string, password: string }, context: Context, info: undefined) => Promise<AuthorizationPayload>,
  createUser: (parent: undefined, args: { data: Partial<User> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<AuthorizationPayload>,
  createPost: <T = Post>(parent: undefined, args: { data: Partial<Post> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  createComment: <T = Comment>(parent: undefined, args: { data: Partial<Comment> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  updateUser: <T = User | null  >(parent: undefined, args: { id: string, data: Partial<User> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  updatePost: <T = Post | null> (parent: undefined, args: { id: string, data: Partial<Post> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  updateComment: <T = Comment | null>(parent: undefined, args: { id: string, data: Partial<Comment> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  deleteUser: <T = User | null>(parent: undefined, args: { id: string }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  deletePost: <T = Post | null>(parent: undefined, args: { id: string }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  deleteComment: <T = Comment | null>(parent: undefined, args: { id: string }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
}


export interface AppQuery {
  users: <T = Array<User | null>>(parent: undefined, args: { query: string } | null, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  posts: <T = Array<Post | null>>(parent: undefined, args: { query: string } | null, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  comments: <T = Array<Comment | null>>(parent: undefined, args: { query: string } | null, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  // me: <T = User | null>(parent: undefined, args: undefined, context: undefined, info?: GraphQLResolveInfo | string) => Promise<T>,
}

export interface AppSubscription {
  comment: { subscribe<T = Comment>(parent: undefined, args: { postId: string }, context: Context, info?: GraphQLResolveInfo | string): Promise<AsyncIterator<T | null>> }
  post: { subscribe<T = Post>(parent: undefined, args: { published: boolean }, context: Context, info?: GraphQLResolveInfo | string): Promise<AsyncIterator<T | null>> }
  // user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T | null>>,
  // post: <T = PostSubscriptionPayload | null>(args: { where?: PostSubscriptionWhereInput | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T | null>>,
}


export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User | null
  updatedFields?: Array<String> | null
  previousValues?: UserPreviousValues | null
}

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED'



export interface UserPreviousValues {
  id: String
  name: String
  email: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface CommentSubscriptionPayload {
  mutation: MutationType
  node?: Comment | null
  updatedFields?: Array<String> | null
  previousValues?: CommentPreviousValues | null
}

export interface CommentPreviousValues {
  id: String
  text: String
  createdAt: DateTime
  updatedAt?: DateTime | null
}
export type DateTime = Date | string