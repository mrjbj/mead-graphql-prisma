import { SetVerror, jStringify } from './applicationError'
import jwt from 'jsonwebtoken'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { JWT_SECRET } from './constants'

export type AppToken = {
  id: string,
  iat: number
}

// this is a synchronous function
// if error thrown (either by !header or by jwt.verify()),
// it will not be caught locally here but bubbled up to mutation that called it.
// the mutation will, in turn, bubble up the error to gql server, which will report it back
//
// if authRequired is false, then don't throw error so caller can continue on if desired.
export const getCurrentUser = (request: ContextParameters, authRequired = true) => {
  const header = request.request.headers.authorization
  let returner = null

  if (authRequired) {
    if (!header) {
      throw SetVerror(undefined, `Authentication Required`)
    }
    const token = header.replace('Bearer ', '')
    const decodedToken = jwt.verify(token, JWT_SECRET) as AppToken
    returner = decodedToken.id
  }
  console.log(`Authorized user: [${returner}]`)
  return returner
}