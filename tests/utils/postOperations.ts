import { gql } from 'apollo-boost'

export const getAllPosts = gql`
    query {
        posts {
            id
            title
            published
        }
    }
`
export const getMyPosts = gql`
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
// template - update Post
export const updateExistingPost = gql`
    mutation($id: ID!, $data: UpdatePostInput!) {
        updatePost(id: $id, data: $data) {
            id
            title
            body
            published
        }
    }
`
// template - createNewPost
export const createNewPost = gql`
    mutation($data: CreatePostInput!) {
        createPost(data: $data) {
            id
            title
            body
            published
        }
    }
`
// template - delete one post by id
export const deletePostById = gql`
    mutation($id: ID!) {
        deletePost(id: $id) {
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
