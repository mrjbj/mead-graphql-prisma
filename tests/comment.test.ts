/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { seedDatabase, postOne, userOne, userTwo, commentOne, commentTwo } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
// import { prisma } from '../src/prisma'
import {
    getAllComments,
    createNewComment,
    updateCommentById,
    deleteCommentById,
} from './utils/operationsComment'

const client = getClient()
beforeEach(seedDatabase)

test('Return all comments', async () => {
    const { data } = await client.query({ query: getAllComments })
    expect(data.comments.length).toBe(2)
    expect(data.comments[0].post.id).toBe(postOne.output?.id)
    expect(data.comments[1].post.id).toBe(postOne.output?.id)
    expect(data.comments[0].author.id).toBe(userOne.output?.id)
    expect(data.comments[1].author.id).toBe(userTwo.output?.id)
})
test('Create new comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = { data: { text: 'New Comment Created by jest test runner', post: postOne.output?.id } }

    const { data } = await client.mutate({
        mutation: createNewComment,
        variables,
    })
    expect(data.createComment.post.id).toBe(postOne.output?.id)
    expect(data.createComment.author.id).toBe(userOne.output?.id)
})
test('Update comment by id', async () => {
    const client = getClient(userOne.jwt)
    const newText = 'updated by the jest test runner.'
    const variables = {
        id: commentOne.output?.id,
        data: { text: newText },
    }
    const { data } = await client.mutate({
        mutation: updateCommentById,
        variables,
    })
    expect(data.updateComment.text).toBe(newText)
})

test('Delete comment by id', async () => {
    const client = getClient(userOne.jwt)
    const variables = { id: commentOne.output?.id }
    const { data } = await client.mutate({
        mutation: deleteCommentById,
        variables,
    })
    expect(data.deleteComment.id).toBe(commentOne.output?.id)
    expect(data.deleteComment.author.id).toBe(userOne.output?.id)
})

test('Cannot delete comment made by another user', async () => {
    const client = getClient(userOne.jwt)
    const variables = { id: commentTwo.output?.id }
    await expect(
        client.mutate({
            mutation: deleteCommentById,
            variables,
        }),
    ).rejects.toThrow()
})
