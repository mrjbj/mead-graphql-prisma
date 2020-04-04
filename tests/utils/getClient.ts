import ApolloBoost from 'apollo-boost'
export const getClient = (): ApolloBoost<unknown> => {
    return new ApolloBoost({ uri: 'http://localhost:4000' })
}
