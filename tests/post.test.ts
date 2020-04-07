/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { seedDatabase, postOne, userOne, PostTwo } from './utils/seedDatabase'
import { prisma } from '../src/prisma'
import { getClient } from './utils/getClient'
import { getMyPosts, updateExistingPost, createNewPost, deletePostById } from './utils/operationsPost'

// fjfjffjjk
beforeEach(seedDatabase)

test('Should return all posts for logged-in user (including draft)', async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({ query: getMyPosts })

    expect(data.myPosts.length).toBe(2) // two test cases
    expect(data.myPosts[1].published).toBeFalsy()
    expect(data.myPosts[0].published).toBeTruthy()
    expect(data.myPosts[0].author.id).toEqual(userOne.output?.id)
    expect(data.myPosts[1].author.id).toEqual(userOne.output?.id)
})

test('User can update their own posts', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postOne.output?.id,
        data: { published: false },
    }
    const { data } = await client.mutate({ mutation: updateExistingPost, variables })
    expect(data.updatePost.published).toBeFalsy()
})

test('Logged in users can create new posts', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        data: {
            title: 'Temp Post',
            body: 'Logged in users are allowed to create new posts',
            published: false,
        },
    }
    const { data } = await client.mutate({ mutation: createNewPost, variables })

    // confirm it's actually in the database
    const exists = await prisma.exists.Post({
        id: data.id,
        published: false,
        title: 'Temp Post',
        body: 'Logged in users are allowed to create new posts',
    })
    expect(exists).toBeTruthy()
})
test('DeletePost removes by id', async () => {
    const client = getClient(userOne.jwt)
    const variables = { id: PostTwo.output?.id }

    await client.mutate({ mutation: deletePostById, variables })
    const exists = await prisma.exists.Post({ id: PostTwo.output?.id })
    // shouldn't be in database any longer
    expect(exists).toBe(false)
})
