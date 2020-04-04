/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import { seedDatabase, keyPost, keyUser } from './utils/seedDatabase'
import { getClient } from './utils/getClient'

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
    expect(response.data.posts[0].id).toBe(keyPost.id)
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
    expect(data.myPosts[0].published).toBeFalsy()
    expect(data.myPosts[1].published).toBeTruthy()
    expect(data.myPosts[0].author.id).toEqual(keyUser.output?.id)
    expect(data.myPosts[1].author.id).toEqual(keyUser.output?.id)
})
