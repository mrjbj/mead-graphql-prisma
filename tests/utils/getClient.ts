import ApolloBoost from 'apollo-boost'

// 1. ApolloBoost.config.request function is called once for each new request
//    as it arrives on the stream.
// 2. Request accepts Operation as parameter, which includes a setContext method.
// 3. setContext accepts arbitrary object and returns arbitrary object.
// 4. we insert jwt into the context if it's provided, leave context alone if not.
export const getClient = (token?: string): ApolloBoost<unknown> => {
    return new ApolloBoost({
        uri: 'http://localhost:4000',
        request(operation): void {
            if (token) {
                operation.setContext({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
        },
    })
}
