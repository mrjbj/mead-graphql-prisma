import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import { prisma } from '../src/prisma'

const client = new ApolloBoost({ uri: 'http://localhost:4000' })

test('Create new user "example@example.com"', async () => {
  const email = 'example@example.com'
  const createUser = gql`
      mutation {
      createUser(data: {
        name: "example",
        email: "${email}",
        password: "GooberPatrol"
      })
      { user { id } }
    }
  `
  // populate database
  await client.mutate({ mutation: createUser })

  // check to ensure that user actually was saved to database
  expect(await prisma.exists.User({ email })).toBeTruthy()
})