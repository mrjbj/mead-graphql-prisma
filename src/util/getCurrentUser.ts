import { SetVerror } from './applicationError'
import jwt from 'jsonwebtoken'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { JWT_SECRET } from './constants'

export type AppToken = {
    userId: string
    iat?: number
}

// this is a synchronous function
// if error thrown (either by !header or by jwt.verify()),
// it will not be caught locally here but bubbled up to mutation that called it.
// the mutation will, in turn, bubble up the error to gql server, which will report it back
//
// if authRequired is false, then don't throw error so caller can continue on if desired.
export const getCurrentUser = (
    request: ContextParameters,
    authRequired = true,
): string | null => {
    // subscriptions have authorization token stored on connection.context
    const header = request.request
        ? request.request.headers.authorization
        : request.connection.context.Authorization
    let returner = null

    // if header is there, process the authorization regardless of authRequired
    if (header) {
        const token = header.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, JWT_SECRET) as AppToken
        if (typeof decodedToken.userId !== 'string') {
            throw SetVerror(
                undefined,
                `Invalid authorization token. Token parsed but userId not found`,
            )
        }
        returner = decodedToken.userId
    } else {
        if (authRequired) {
            throw SetVerror(undefined, `Authentication Required`)
        }
    }

    console.log(`Authorized user: [${returner}]`)
    return returner
}
