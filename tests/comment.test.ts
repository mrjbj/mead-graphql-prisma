/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { seedDatabase, postOne, userOne, commentOne, commentTwo } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
import { prisma } from '../src/prisma'
import {
    createNewComment,
    updateCommentById,
    deleteCommentById,
    subscribeToCommentsOnPost,
} from './utils/operationsComment'
//
beforeEach(seedDatabase)

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
    const exists = await prisma.exists.Comment({ id: commentOne.output?.id })
    expect(exists).not.toBeTruthy()
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

//  - subscribe is callback function that gets called whenever server side needs to notify
//    next receives the notification
//  - use done handle to signal to jest to hang around until done is called
test('Subscribe to comments on post', async done => {
    const client = getClient(userOne.jwt)
    const variables = { postId: postOne.output?.id }
    client
        .subscribe({
            query: subscribeToCommentsOnPost,
            variables,
        })
        .subscribe({
            next(response) {
                expect(response.data.comment.mutation).toBe('UPDATED')
                done()
            },
        })
    // Create/Change/Delete a comment to trigger the subscribe callback.
    const newText = 'this update to comment should trigger subscription.'
    const variables2 = {
        id: commentOne.output?.id,
        data: { text: newText },
    }
    await client.mutate({
        mutation: updateCommentById,
        variables: variables2,
    })
})
