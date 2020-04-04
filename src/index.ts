import { watchSchemaFiles } from './util/watchSchemaFiles'
import { setupGlobalErrorHandler } from './util/errorhander'
import { server } from './server'
import { DEV_PORT } from './util/constants'

if (process.env.NODE_ENV !== 'production') {
    watchSchemaFiles() // ts-node-dev should look for changes to schema.graphql also
}
setupGlobalErrorHandler()

server
    .start({ port: process.env.PORT || DEV_PORT }, () => {
        if (process.env.RUN_MODE != 'TEST') {
            console.log(`GraphQL server running on port: [${process.env.PORT || DEV_PORT}].`)
        }
    })
    .catch(() => console.log('error starting GraphQL server.'))
