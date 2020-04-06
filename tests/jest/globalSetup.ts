import { server } from '../../src/server'
import { DEV_PORT } from '../../src/util/constants'
import WebSocket from 'ws'

export default async (global: any): Promise<void> => {
    Object.assign(global, { WebSocket })
    global.httpServer = await server.start({ port: process.env.PORT || DEV_PORT }, () => {
        console.log(`\nGraphQL server running on port: [${process.env.PORT || DEV_PORT}].`)
        console.log(`Global is: [${JSON.stringify(global)}]`)
    })
}
