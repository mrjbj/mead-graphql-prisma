// setup before each test
// 1. delete comments, then posts, then users
// 2. create keyUser for login
// 3. create keyPosts (one in draft, one published)
// 4. create keyComments

import { prisma } from '../../src/prisma'
import bcrypt from 'bcryptjs'
import { User, Post } from '../../src/types/graphqlBindings'
import { generateToken } from '../../src/util/generateToken'

type TestObject<T> = {
    input: {
        [key: string]: unknown
    }
    output?: T
    jwt?: string
}

export const keyUser: TestObject<User> = {
    input: {
        name: 'The Dude',
        email: 'dude@example.com',
        password: bcrypt.hashSync('GooberPatrol'),
    },
    output: undefined,
    jwt: undefined,
}
export const keyPost: TestObject<Post> = {
    input: {
        title: 'Test Post 1 (Published)',
        body: 'this is a test post, created with published status',
        published: true,
        author: { connect: { email: keyUser.input.email } },
    },
    output: undefined,
    jwt: undefined,
}
export const keyPost2: TestObject<Post> = {
    input: {
        title: 'Test Post 2 (* Draft *)',
        body: 'this is a test post, created with published status set to FALSE',
        published: false,
        author: { connect: { email: keyUser.input.email } },
    },
    output: undefined,
    jwt: undefined,
}

export const seedDatabase = async (): Promise<void> => {
    // delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // insert keyUser, keyUser's authorization token
    keyUser.output = (await prisma.mutation.createUser({ data: keyUser.input })) as User
    keyUser.jwt = generateToken(keyUser.output.id)

    // insert keyPost (published)
    keyPost.output = await prisma.mutation.createPost({ data: keyPost.input })
    // insert keyPost (draft)
    keyPost2.output = await prisma.mutation.createPost({ data: keyPost2.input })
}
