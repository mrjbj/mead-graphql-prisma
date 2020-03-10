import { PubSub } from "graphql-yoga"
import { Prisma } from 'prisma-binding'

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