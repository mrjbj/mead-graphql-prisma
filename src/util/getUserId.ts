import { SetVerror, jStringify } from './applicationError'
import jwt from 'jsonwebtoken'
import Assert from 'assert'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { JWT_SECRET } from './constants'

export type AppToken = {
  userId: string,
  iat: number
}

//
export const getUserId = (request: ContextParameters) => {
  Assert.equal(typeof request.request.headers.authorization, "string", `request.headers.authorization not a string: [${jStringify(request.request.headers.authorization)}]`)

  const header = request.request.headers.authorization

  if (!header) {
    throw SetVerror(undefined, `Authentication Required`)
  }
  const token = header.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, JWT_SECRET) as AppToken
  return decodedToken.userId
}