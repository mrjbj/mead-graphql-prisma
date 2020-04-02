import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import { prisma } from '../src/prisma'
import bcrypt from 'bcryptjs'

const client = new ApolloBoost({ uri: 'http://localhost:4000' })
const password = 'GooberPatrol'

// setup before each test
// 1. delete comments, then posts, then users
// 2. create keyUser for login
// 3. create keyPosts (one in draft, one published)
// 4. create keyComments
beforeEach(async () => {
    const keyUserEmail = 'dude@example.com'

    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    // keyUser
    await prisma.mutation.createUser({
        data: {
            name: 'The Dude',
            email: keyUserEmail,
            password: bcrypt.hashSync(password),
        },
    })
    // keyPost (draft)
    await prisma.mutation.createPost({
        data: {
            title: 'Test Post (* DRAFT *)',
            body: 'this is a test post, created with published set to false',
            published: false,
            author: { connect: { email: keyUserEmail } },
        },
    })
    // keyPost (published)
    await prisma.mutation.createPost({
        data: {
            title: 'Test Post (Published)',
            body: 'this is a test post, created with published status',
            published: true,
            author: { connect: { email: keyUserEmail } },
        },
    })
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
