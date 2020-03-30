import { server } from '../../src/server'
declare var global: any

export default async () => {
  global.httpServer = await server.start({ port: process.env.PORT || 4000 }, () => {
    console.log(`GraphQL server running on port: [${process.env.PORT || 4000}].`)
  })
}


