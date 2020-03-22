import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import User from './User'
import Post from './Post'
import Comment from './Comment'

// TODO: figure out typescript typings for resolvers and "fragmentReplacements"
export const resolvers: any = {
  Query,                            // (2)
  Mutation,                         // (3)
  Subscription,                     // (4)
  User,                             // (5)
  Post,
  Comment
}

export const fragmentReplacements: any = extractFragmentReplacements(resolvers)