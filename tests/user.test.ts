/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { prisma } from '../src/prisma'
import { seedDatabase, userOne, postOne, userTwo } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
import { getProfile, createUser, getUsers, loginUser } from './utils/operationsUser'
import { getAllComments } from './utils/operationsComment'
import { getAllPosts } from './utils/operationsPost'

beforeEach(seedDatabase) // beforeEach has code to invoke function we pass it

test('Create new user', async () => {
    const client = getClient() // no authentication
    // template variable
    const variables = {
        data: {
            name: 'createNewUser Test',
            email: 'example-1@example.com',
            password: 'GooberPatrol',
        },
    }
    // populate database
    await client.mutate({
        mutation: createUser,
        variables,
    })
    // check to ensure that user actually was saved to database
    expect(await prisma.exists.User({ email: variables.data.email })).toBeTruthy()
})

test('Get users without authentication (email is null)', async () => {
    const client = getClient() // no authentication
    const response = await client.query({ query: getUsers })
    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].name).toBe(userOne.input.name)
    expect(response.data.users[0].email).toBe(null)
})

test('Login fail (bad credentials)', async () => {
    const client = getClient() // no authentication
    const variables = {
        email: userOne.output?.email,
        password: '2short',
    }
    await expect(client.mutate({ mutation: loginUser, variables })).rejects.toThrow()
})

test('Password not >= MIN_PASSWORD_LENGTH', async () => {
    const client = getClient() // no authentication
    const variables = {
        data: {
            name: 'password-too-short',
            email: 'does-not-get-added@example.com',
            password: '1234',
        },
    }
    // populate database
    await expect(
        client.mutate({
            mutation: createUser,
            variables,
        }),
    ).rejects.toThrow()
})
test('Get profile for authenticated user (email not null)', async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({ query: getProfile })
    expect(data.me.id).toBe(userOne.output?.id)
    expect(data.me.name).toBe(userOne.output?.name)
    expect(data.me.email).toBe(userOne.output?.email)
    expect(data.me.email).not.toBe(null)
})
// all tests that require no authentication

test('Return all comments', async () => {
    const client = getClient() // no authentication
    const { data } = await client.query({ query: getAllComments })
    expect(data.comments.length).toBe(2)
    expect(data.comments[0].post.id).toBe(postOne.output?.id)
    expect(data.comments[1].post.id).toBe(postOne.output?.id)
    expect(data.comments[0].author.id).toBe(userOne.output?.id)
    expect(data.comments[1].author.id).toBe(userTwo.output?.id)
})

test('Query "posts" should return only published items', async () => {
    const client = getClient() // no authentication
    const response = await client.query({ query: getAllPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].id).toBe(postOne.output?.id)
    expect(response.data.posts[0].published).toBeTruthy()
})
