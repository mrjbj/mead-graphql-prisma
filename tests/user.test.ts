/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import { prisma } from '../src/prisma'
import { seedDatabase, keyUser } from './utils/seedDatabase'
import { getClient } from './utils/getClient'

const client = getClient() // up to us to invoke getClient on our own (hence ())
beforeEach(seedDatabase) // beforeEach has code to invoke function we pass it

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

test('Return public author profiles (e.g. no email)', async () => {
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `
    const response = await client.query({ query: getUsers })
    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].name).toBe(keyUser.name)
    expect(response.data.users[0].email).toBe(null)
})

test('Login should fail with bad credentials', async () => {
    const loginAction = gql`
        mutation {
            login(email: "${keyUser.email}", password: "${keyUser.password}+bad.")
            {
                token
            }
        }
    `
    await expect(client.mutate({ mutation: loginAction })).rejects.toThrow()
})

test('Password must >= MIN_PASSWORD_LENGTH', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: { name: "password-too-short", email: "do-not-add-me@example.com", password: "1234" }
            ) {
                token
            }
        }
    `
    // populate database
    await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})
