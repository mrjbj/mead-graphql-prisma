declare var global: any

export default async () => {
  await global.httpServer.close()
  console.log("GraphQL server shutdown.")
}