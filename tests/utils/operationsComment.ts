import { gql } from 'apollo-boost'

// return all comments  ()
// shoudl return one comment (where: {id: ID!})
// create new comment (data: CommentCreateInput! which is (text: String!, post: {connect: {id: }}, author: {connect: {email: }})
// update existing comment (where: {id: ID}, data: {id: id})
// delete one comment (where: {id: id})
//

export const getAllComments = gql`
    query {
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
`
