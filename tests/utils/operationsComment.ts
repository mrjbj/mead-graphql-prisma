import { gql } from 'apollo-boost'

// return all comments  ()
// create new comment (data: CommentCreateInput! which is (text: String!, post: {connect: {id: }}, author: {connect: {email: }})
// update existing comment (where: {id: ID}, data: {id: id})
// delete one comment (where: {id: id})
//

// template - get all comments (not draft)
export const getAllComments = gql`
    query {
        comments {
            id
            text
            post {
                id
                title
                body
                published
                author {
                    id
                    name
                    email
                }
            }
            author {
                id
                name
                email
            }
        }
    }
`
// template - create a new comment
export const createNewComment = gql`
    mutation($data: CreateCommentInput!) {
        createComment(data: $data) {
            id
            text
            post {
                id
                title
                body
                published
                author {
                    id
                    name
                    email
                }
            }
            author {
                id
                name
                email
            }
        }
    }
`
// template - update comment by id
export const updateCommentById = gql`
    mutation($id: ID!, $data: UpdateCommentInput) {
        updateComment(id: $id, data: $data) {
            id
            text
        }
    }
`
// template - delete comment by id
export const deleteCommentById = gql`
    mutation($id: ID!) {
        deleteComment(id: $id) {
            id
            text
            author {
                id
            }
        }
    }
`
// template - subscribe to comments on post
export const subscribeToCommentsOnPost = gql`
    subscription($postId: ID!) {
        comment(postId: $postId) {
            mutation
            node {
                id
                text
                post {
                    id
                    title
                }
            }
        }
    }
`
