// Resolvers
//  - Query object acts as container for each of the resolvable query elements
//    assigned to the GraphQL "Query" type (defined in schema.graphql)
//  - each query method defined in schema.graphql is then implemented here as a "resolver"
//    with scalar types returning straight back and with any related or associated
//    non-scalar types (e.g. Users, Posts, Comments) having their resolvers called
//    iteratively for each row in the parent.
//  - These related resolvers have same name as the non-scalar type (e.g. Post, Comment, User).
//
//    Note: methods are attached to objects, so 'this' is important and arrow functions not used.
//  - GraphQL resolver runtime is promise-aware. If resolver returns a promise,
//    graphql will wait for it to resolve, so it's okay to return
//    a promise from resolver function without await   (1)
import { DynamicObject, AppQuery, Post } from '../types/types'
import Assert from 'assert'
import { Prisma } from 'prisma-binding'
import { jStringify, SetVerror } from '../util/applicationError'
import { getCurrentUser } from '../util/getCurrentUser'
import { Query } from '../types/graphqlBindings'

const Query: AppQuery = {
  async users(_parent, args, { prisma }, info) {
    Assert(prisma instanceof Prisma, `Assert: parameter [prisma] is not an object: [${jStringify(prisma)}]`)

    const queryArgs: DynamicObject = {
      first: args!.first,
      skip: args!.skip,
      after: args!.after
    }
    // != means both 'null' and 'undefined' resolve to false, so query must contain something that's not null.
    if (args!.query != null) {
      queryArgs.where.OR = [{ name_contains: args!.query }]
    }
    return prisma.query.users(queryArgs, info) // (1)
  },
  async posts(_parent, args, { prisma }, info) {
    const queryArgs: DynamicObject = {
      first: args!.first,
      skip: args!.skip,
      after: args!.after,
      where: { published: true }
    }
    if (args!.query != null) {
      queryArgs.where.OR = [{ title_contains: args!.query }, { body_contains: args!.query }]
    }
    return prisma.query.posts(queryArgs, info)
  },
  async comments(_parent, args, { prisma }, info) {
    const queryArgs: DynamicObject = {
      first: args!.first,
      skip: args!.skip,
      after: args!.after
    }
    if (args!.query != null) {
      queryArgs.where = { text_contains: args!.query }
    }
    return prisma.query.comments(queryArgs, info)
  },
  // if post is published, then return since access to all,
  // if post is not published, then return only if current user is author
  async post(_parent, args, { prisma, request }, info) {
    const currentUser = getCurrentUser(request, false)
    const post = await prisma.query.post({ where: { id: args.id } }, info) as Post
    if (!post) {
      throw SetVerror(undefined, `Post not found.`)
    }
    if (post.published) {
      return post
    } else if (currentUser !== post.author.id) {
      throw SetVerror(undefined, `Please login first.`)
    } else {
      return post
    }
  },
  async me(_parent, _args, { prisma, request }, info) {
    const currentUser = getCurrentUser(request)
    return await prisma.query.user({ where: { id: currentUser } }, info)
  },
  async myPosts(_parent, args, { prisma, request }, info) {
    const currentUser = getCurrentUser(request)
    const queryArgs: DynamicObject = { where: { author: { id: currentUser } } }
    if (args!.query != null) {
      queryArgs.where.OR = [{ title_contains: args!.query }, { body_contains: args!.query }]
    }
    return prisma.query.posts(queryArgs, info)
  }
}

export { Query as default }