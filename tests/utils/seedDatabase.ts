// setup before each test
// 1. delete comments, then posts, then users
// 2. create keyUser for login
// 3. create keyPosts (one in draft, one published)
// 4. create keyComments

import { prisma } from '../../src/prisma'
import bcrypt from 'bcryptjs'
import { User } from '../../src/types/graphqlBindings'
import { generateToken } from '../../src/util/generateToken'

type TestObject = {
    input: {
        [key: string]: unknown
    }
    output: unknown
    jwt: unknown
}

export const keyUser: TestObject = {
    input: {
        name: 'The Dude',
        email: 'dude@example.com',
        password: bcrypt.hashSync('GooberPatrol'),
    },
    output: undefined,
    jwt: undefined,
}
export const keyPost = {
    id: '',
    title: 'Test Post (Published)',
}

export const seedDatabase = async (): Promise<void> => {
    // delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    // insert keyUser & it's authentication token
    keyUser.output = (await prisma.mutation.createUser({ data: keyUser.input })) as User
    keyUser.jwt = generateToken((keyUser.output as User).id)
    console.log(keyUser.output.prototype)

    // keyPost (draft)
    await prisma.mutation.createPost({
        data: {
            title: 'Test Post (* DRAFT *)',
            body: 'this is a test post, created with published set to false',
            published: false,
            author: { connect: { email: keyUser.input.email } },
        },
    })
    // keyPost (published)
    const newPost = await prisma.mutation.createPost({
        data: {
            title: keyPost.title,
            body: 'this is a test post, created with published status',
            published: true,
            author: { connect: { email: keyUser.input.email } },
        },
    })
    keyPost.id = newPost.id
}
