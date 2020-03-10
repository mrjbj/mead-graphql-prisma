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
import { Context, User, Post, Comment, ResolverMap } from '../types/types'

const Query: ResolverMap = {
  users(_parent, _args, { prisma }, info): Promise<User[]> {
    return prisma.query.users(undefined, info) // (1)
  },
  me() {
    return {
      id: 'abc123',
      name: 'Jason Jones',
      email: 'jason@brucejones.biz',
      age: 55
    }
  },
  posts(_parent, _args, { prisma }: Context, info): Promise<Post[]> {
    return prisma.query.posts(undefined, info)
    // if (!args.query) {
    //   return db.posts
    // }
    // return db.posts.filter(item =>
    //   item.title.toLowerCase().includes(args.query.toLowerCase()) ||
    //   item.body.toLowerCase().includes(args.query.toLowerCase())
    // )
  },
  comments({ db }: Context): Comment[] {
    return db.comments
  }
}

export { Query as default }