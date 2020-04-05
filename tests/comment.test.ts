/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { seedDatabase } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
// import { prisma } from '../src/prisma'
import { getAllComments } from './utils/operationsComment'

const client = getClient()
beforeEach(seedDatabase)

test('Return all comments', async () => {
    const response = await client.query({ query: getAllComments })
    console.log(response)
    // expect(response.data.comments.length).toBe(2)
    // expect(response.data.posts[0].id).toBe(postOne.output?.id)
    // expect(response.data.posts[1].id).toBe(postOne.output?.id)
    // expect(response.data.posts[1].).toBe(postOne.output?.id)
    // expect(response.data.posts[1].id).toBeTruthy()
})

// return all comments  ()
// shoudl return one comment (where: {id: ID!})
// create new comment (data: CommentCreateInput! which is (text: String!, post: {connect: {id: }}, author: {connect: {email: }})
// update existing comment (where: {id: ID}, data: {id: id})
// delete one comment (where: {id: id})
//
