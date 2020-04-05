/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import { seedDatabase, keyPost, keyUser, keyPost2 } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
import { prisma } from '../src/prisma'

const client = getClient()
beforeEach(seedDatabase)

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
    expect(response.data.posts[0].id).toBe(keyPost.output?.id)
    expect(response.data.posts[0].published).toBeTruthy()
})

test('Should return all posts for logged-in user (including draft)', async () => {
    const client = getClient(keyUser.jwt)
    const getMyPosts = gql`
        query {
            myPosts {
                id
                title
                body
                published
                updatedAt
                createdAt
                author {
                    id
                }
            }
        }
    `
    const { data } = await client.query({ query: getMyPosts })
    expect(data.myPosts.length).toBe(2) // two test cases
    expect(data.myPosts[1].published).toBeFalsy()
    expect(data.myPosts[0].published).toBeTruthy()
    expect(data.myPosts[0].author.id).toEqual(keyUser.output?.id)
    expect(data.myPosts[1].author.id).toEqual(keyUser.output?.id)
})

test('User can update their own posts', async () => {
    const client = getClient(keyUser.jwt)
    const updateGQL = gql`
        mutation {
            updatePost(id: "${keyPost.output?.id}", data: { published: false}) {
                id
                title
                body
                published
            }
        }
    `
    const { data } = await client.mutate({ mutation: updateGQL })
    expect(data.updatePost.published).toBeFalsy()
})

test('Logged in user can create posts', async () => {
    const client = getClient(keyUser.jwt)
    const myGql = gql`
        mutation {
            createPost(
                data: { title: "Temp Post", body: "Logged in user can create posts", published: false }
            ) {
                id
                title
                body
                published
                author {
                    id
                    name
                }
            }
        }
    `
    const { data } = await client.mutate({ mutation: myGql })
    // confirm it's actually in the database
    const exists = await prisma.exists.Post({
        id: data.id,
        published: false,
        title: 'Temp Post',
        body: 'Logged in user can create posts',
    })
    expect(exists).toBeTruthy()
})
test('DeletePost removes by id', async () => {
    const client = getClient(keyUser.jwt)
    const myGql = gql`
        mutation {
            deletePost(id: "${keyPost2.output?.id}") {
                id
                title
                body
                published
                author { id name}
            }
        }
    `
    await client.mutate({ mutation: myGql })
    const exists = await prisma.exists.Post({ id: keyPost2.output?.id })
    // shouldn't be in database any longer
    expect(exists).toBe(false)
})
