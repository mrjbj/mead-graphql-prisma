/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import { seedDatabase, keyPost } from './utils/seedDatabase'
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
