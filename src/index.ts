import { watchSchemaFiles } from './util/watchSchemaFiles'
import { setupGlobalErrorHandler } from './util/errorhander'
import { server } from './server'

if (process.env.NODE_ENV !== 'production') {
  watchSchemaFiles() // ts-node-dev should look for changes to schema.graphql also
}
setupGlobalErrorHandler()

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log(`GraphQL server running on port: [${process.env.PORT || 4000}].`)
})
