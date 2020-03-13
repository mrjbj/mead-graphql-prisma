import { PubSub } from "graphql-yoga"
import { Prisma } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export type User = {
  id: string,
  name: string,
  email: string,
  age?: number
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

type ResolverFunction = (parent: any, args: any, context: Context, info: any) => any

export interface ResolverMap {
  [field: string]: ResolverFunction
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
  createUser: <T = User>(parent: undefined, args: { data: { name: string, email: string } }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  createPost: <T = Post>(parent: undefined, args: { data: { title: string, body: string, published: boolean, author: string } }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  createComment: <T = Comment>(parent: undefined, args: { data: { text: string, author: string, post: string } }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T>,
  updateUser: <T = User | null  >(parent: undefined, args: { id: string, data: Partial<User> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  updatePost: <T = Post | null> (parent: undefined, args: { id: string, data: Partial<Post> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  updateComment: <T = Comment | null>(parent: undefined, args: { id: string, data: Partial<Comment> }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  deleteUser: <T = User | null>(parent: undefined, args: { id: string }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  deletePost: <T = Post | null>(parent: undefined, args: { id: string }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
  deleteComment: <T = Comment | null>(parent: undefined, args: { id: string }, context: Context, info?: GraphQLResolveInfo | string) => Promise<T | null>,
}

