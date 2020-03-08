import { Prisma } from "prisma-binding"

const prisma = new Prisma({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query.users(undefined, '{id name  posts {id title comments{text } } }').then((data: any) => {
//   console.log(JSON.stringify(data, null, 4))
// })

const wrapper = async () => {
  const data = await prisma.query.comments(undefined, "{id text author {id name email}}")
  console.log(JSON.stringify(data, null, 2))
}

wrapper()