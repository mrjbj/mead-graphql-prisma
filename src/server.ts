/*
 * ---------------------------------------------------------------------------------------------------------
 * Configure GraphQL server object
 * ---------------------------------------------------------------------------------------------------------
 * typedefs: specifying GraphQL schema definition as filename allows import from external file          (1)
 * resolvers:
 *   - Query, Mutation & Subscription are reserved names for standard properties, defined by GraphQL
 *       - resolvers.Query{} contains a list of methods that query data from database.                  (2)
 *       - resolvers.Mutation{} constains a list of methods that change data in database.               (3)
 *       - resolvers.Subscription{} is like Query{} but pushes data when it changes rather than         (4)
 *         pulling data only upon request.
 *       - resolvers.<method> implements the queries or mutations declared in Query{} or Mutation{}
 *          - each resolvers.<method> function can return (or resolve) scalar types directly.
 *          - if resolvers.<method> needs to return a custom GraphQL type, (for example 'User'), then   (5)
 *            it will expect another resolver method with that same name to have been defined
 *            (e.g. resolvers.Users) and GraphQL runtime will call it iteratively for each row returned
 *            by the parent.  (The 'parent' argument will be populated with info concerning this).
 *          - resolvers.<method> is a function defined inside an object, so 'this' binding is important
 *            (e.g. use ES6 method syntax that preserves 'this' binding - do not use arrow functions).
 * context: setting context to db object makes it available to every resolver method in the entire
 *          system via ctx parameter (e.g. resolvers.me(parent, args, ctx, info))                       (6)
 * ---------------------------------------------------------------------------------------------------------
 */
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { db } from './db'
import { resolvers } from './resolvers/index'
import { prisma } from './prisma'

const pubsub = new PubSub()

// obtaining the context object via call to context() method.
// yoga will call the context function on each request, passing
// in the request object provided by nodejs from the client // (2)
export const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',   // (1)
  resolvers,
  context(request) {                  // (2)
    return {
      db,
      pubsub,
      prisma,
      request
    }                                  // (6)
  }
})