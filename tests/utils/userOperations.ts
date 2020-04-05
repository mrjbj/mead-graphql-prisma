import { gql } from 'apollo-boost'

// template - createUser
export const createUser = gql`
    mutation($data: CreateUserInput!) {
        createUser(data: $data) {
            token
            user {
                id
                name
                email
            }
        }
    }
`
// template - getUsers
export const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`
export const loginUser = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

// template - getProfile for logged-in user
export const getProfile = gql`
    query {
        me {
            id
            name
            email
        }
    }
`
