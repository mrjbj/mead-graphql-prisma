import { server } from '../../src/server'
import { DEV_PORT } from '../../src/util/constants'

declare let global: any

export default async (): Promise<void> => {
    global.httpServer = await server.start({ port: process.env.PORT || DEV_PORT }, () => {
        console.log(`\nGraphQL server running on port: [${process.env.PORT || DEV_PORT}].`)
        // console.log(`Global is: [${JSON.stringify(global)}]`)
    })
}
