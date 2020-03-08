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
import { watchSchemaFiles } from './util/watchSchemaFiles'
import { setupGlobalErrorHandler } from './util/errorhander'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import './prisma' // just to get it to run

if (process.env.NODE_ENV !== 'production') {
  watchSchemaFiles() // ts-node-dev should look for changes to schema.graphql also
}
setupGlobalErrorHandler()

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',   // (1)
  resolvers: {
    Query,                            // (2)
    Mutation,                         // (3)
    Subscription,                     // (4)
    User,                             // (5)
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }                                  // (6)
})

server.start(() => {
  console.log('GraphQL server ready...')
})
