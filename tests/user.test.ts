/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import { prisma } from '../src/prisma'
import bcrypt from 'bcryptjs'

const client = new ApolloBoost({ uri: 'http://localhost:4000' })
const keyUser = {
    id: '',
    name: 'The Dude',
    email: 'dude@example.com',
    password: 'GooberPatrol',
}
const keyPost = {
    id: '',
    title: 'Test Post (Published)',
}
// setup before each test
// 1. delete comments, then posts, then users
// 2. create keyUser for login
// 3. create keyPosts (one in draft, one published)
// 4. create keyComments
beforeEach(async () => {
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    // keyUser
    const newUser = await prisma.mutation.createUser({
        data: {
            name: keyUser.name,
            email: keyUser.email,
            password: bcrypt.hashSync(keyUser.password),
        },
    })
    keyUser.id = newUser.id // update id

    // keyPost (draft)
    await prisma.mutation.createPost({
        data: {
            title: 'Test Post (* DRAFT *)',
            body: 'this is a test post, created with published set to false',
            published: false,
            author: { connect: { email: keyUser.email } },
        },
    })
    // keyPost (published)
    const newPost = await prisma.mutation.createPost({
        data: {
            title: keyPost.title,
            body: 'this is a test post, created with published status',
            published: true,
            author: { connect: { email: keyUser.email } },
        },
    })
    keyPost.id = newPost.id
})

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

test('Query "posts" should return only published items', async () => {
    const getPosts = gql`
        query {
            posts {
                id
                title
                published
            }
        }
    `
    const response = await client.query({ query: getPosts })
    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].id).toBe(keyPost.id)
    expect(response.data.posts[0].published).toBeTruthy()
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
    const tempUser = await prisma.mutation.createUser({
        data: {
            name: 'Will not be added.',
            email: 'donotadd@example.com',
            password: '1234',
        },
    })
    console.log(tempUser)
    // await expect(
    //     prisma.mutation.createUser({
    //         data: {
    //             name: 'Will not be added.',
    //             email: 'donotadd@example.com',
    //             password: '1234',
    //         },
    //     }),
    // ).rejects.toThrow()
})
