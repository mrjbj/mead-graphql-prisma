/* eslint no-magic-numbers: 0 */
import 'cross-fetch/polyfill'
import { seedDatabase, postOne, userOne, commentOne } from './utils/seedDatabase'
import { getClient } from './utils/getClient'
import { updateCommentById, subscribeToCommentsOnPost } from './utils/operationsComment'

beforeEach(seedDatabase)

//  - subscribe is callback function that gets called whenever server side needs to notify
//    next receives the notification
//  - use done handle to signal to jest to hang around until done is called
// trest
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
