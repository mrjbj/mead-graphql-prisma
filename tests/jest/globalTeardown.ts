declare let global: any

export default async (): Promise<void> => {
    await global.httpServer.close()
    console.log('GraphQL server shutdown.')
}
