import { PubSub } from "graphql-yoga"

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

export type Context = { db: DB, pubsub: PubSub }