// setup before each test
// 1. delete comments, then posts, then users
// 2. create keyUser for login
// 3. create keyPosts (one in draft, one published)
// 4. create keyComments

import { prisma } from '../../src/prisma'
import bcrypt from 'bcryptjs'
import { User, Post, Comment } from '../../src/types/graphqlBindings'
import { generateToken } from '../../src/util/generateToken'

type TestObject<T> = {
    input: {
        [key: string]: unknown
    }
    output?: T
    jwt?: string
}
export const userOne: TestObject<User> = {
    input: {
        name: 'The Dude',
        email: 'dude@example.com',
        password: bcrypt.hashSync('GooberPatrol'),
    },
    output: undefined,
    jwt: undefined,
}
export const userTwo: TestObject<User> = {
    input: {
        name: 'The Secondary',
        email: 'secondary@example.com',
        password: bcrypt.hashSync('GooberPatrol'),
    },
    output: undefined,
    jwt: undefined,
}
export const postOne: TestObject<Post> = {
    input: {
        title: 'Test Post 1 (Published)',
        body: 'this is a test post, created with published status',
        published: true,
        author: { connect: { email: userOne.input.email } },
    },
    output: undefined,
    jwt: undefined,
}
export const PostTwo: TestObject<Post> = {
    input: {
        title: 'Test Post 2 (* Draft *)',
        body: 'this is a test post, created with published status set to FALSE',
        published: false,
        author: { connect: { email: userOne.input.email } },
    },
    output: undefined,
    jwt: undefined,
}
export const commentOne: TestObject<Comment> = {
    input: {
        text: 'This is comment on my own post.  Boy am I awesome!',
    },
    output: undefined,
    jwt: undefined,
}
export const commentTwo: TestObject<Comment> = {
    input: {
        text: "This is comment from an admirer.  They think I'm awesome too!",
    },
    output: undefined,
    jwt: undefined,
}

export const seedDatabase = async (): Promise<void> => {
    // delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // insert two users, with authorization tokens for each
    userOne.output = (await prisma.mutation.createUser({ data: userOne.input })) as User
    userOne.jwt = generateToken(userOne.output.id)

    userTwo.output = (await prisma.mutation.createUser({ data: userTwo.input })) as User
    userTwo.jwt = generateToken(userTwo.output.id)

    // insert keyPost (published)
    postOne.output = await prisma.mutation.createPost({ data: postOne.input })
    // insert keyPost (draft)
    PostTwo.output = await prisma.mutation.createPost({ data: PostTwo.input })

    // keyPost - add one comment from each user
    commentOne.output = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            post: { connect: { id: postOne.output?.id } },
            author: { connect: { email: userOne.output.email } },
        },
    })
    commentTwo.output = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            post: { connect: { id: postOne.output?.id } },
            author: { connect: { email: userTwo.output.email } },
        },
    })
}
