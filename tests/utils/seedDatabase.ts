// setup before each test
// 1. delete comments, then posts, then users
// 2. create keyUser for login
// 3. create keyPosts (one in draft, one published)
// 4. create keyComments

import { prisma } from '../../src/prisma'
import bcrypt from 'bcryptjs'

export const keyUser = {
    id: '',
    name: 'The Dude',
    email: 'dude@example.com',
    password: 'GooberPatrol',
}
export const keyPost = {
    id: '',
    title: 'Test Post (Published)',
}

export const seedDatabase = async (): Promise<void> => {
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
}
