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
import { Context, User, Post, Comment } from '../types/types'

const Query = {
  users(args: { query: string }, { db }: Context): User[] {
    if (!args.query) {
      return db.users
    } else {
      return db.users.filter(item => item.name.toLowerCase().includes(args.query.toLowerCase()))
    }
  },
  me() {
    return {
      id: 'abc123',
      name: 'Jason Jones',
      email: 'jason@brucejones.biz',
      age: 55
    }
  },
  posts(args: { query: string }, { db }: Context): Post[] {
    if (!args.query) {
      return db.posts
    }
    return db.posts.filter(item =>
      item.title.toLowerCase().includes(args.query.toLowerCase()) ||
      item.body.toLowerCase().includes(args.query.toLowerCase())
    )
  },
  comments({ db }: Context): Comment[] {
    return db.comments
  }
}

export { Query as default }