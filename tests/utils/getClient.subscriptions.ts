// First up, install the modules necessary with the following command
// npm install apollo-client@2.4.2 apollo-cache-inmemory@1.2.10 apollo-link-http@1.5.5 apollo-link-error@1.1.1 apollo-link@1.2.3 apollo-link-ws@1.0.9 apollo-utilities@1.0.21 subscriptions-transport-ws@0.9.15 @babel/polyfill@7.0.0 graphql@0.13.2
// npm install apollo-client apollo-cache-inmemory apollo-link-http apollo-link-error apollo-link apollo-link-ws apollo-utilities subscriptions-transport-ws graphql

import * as fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable, Operation } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import WebSocket from 'ws'

// Configure the ApolloClient for either Http or WebSocket, depending upon operation.
// 1. request() -> puts Authorization header into context of the Apollo GQL operation.
// 2. requestLink ->
export const getClient = (jwt?: string): ApolloClient<NormalizedCacheObject> => {
    const httpURL = 'http://localhost:4000'
    const websocketURL = 'ws://localhost:4000'

    // Setup the authorization header for the http client
    const request = (operation: Operation): void => {
        if (jwt) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
        }
    }

    // Setup the request handlers for the http clients
    // request handler that accepts gql operation and next apolloLink
    // returns new Observable with behavior defined by subscriber function.
    // subscriber function is called every time Observable.subscribe() is called by client.
    // the client passes in the "observer object (containing next(), error(), complete())
    const requestLink = new ApolloLink((operation, forward) => {
        return new Observable(observer => {
            let handle: any
            Promise.resolve(operation)
                .then(oper => {
                    request(oper)
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    })
                })
                .catch(observer.error.bind(observer))
            // cleanup function called when subscription is closed
            return (): any => {
                if (handle) {
                    handle.unsubscribe()
                }
            }
        })
    })

    // Web socket link for subscriptions
    const wsLink = ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL over WS error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                )
            }

            if (networkError) {
                console.log(`[Network error]: ${networkError}`)
            }
        }),
        requestLink,
        new WebSocketLink(
            new SubscriptionClient(
                websocketURL,
                {
                    reconnect: true,
                    inactivityTimeout: 100,
                    timeout: 1000,
                    connectionParams: (): void | Record<string, string> => {
                        if (jwt) {
                            return {
                                Authorization: `Bearer ${jwt}`,
                            }
                        }
                    },
                },
                WebSocket,
            ),
        ),
    ])

    // HTTP link for queries and mutations
    const httpLink = ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[JBJ GraphQL over HTTP error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                )
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`)
            }
        }),
        requestLink,
        new HttpLink({
            uri: httpURL,
            credentials: 'same-origin',
            fetch,
        } as any),
    ])

    // Link to direct ws and http traffic to the correct place
    const link = ApolloLink.split(
        // Pick which links get the data based on the operation kind
        ({ query }) => {
            const definition = getMainDefinition(query)
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        },
        wsLink,
        httpLink,
    )

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    })
}
