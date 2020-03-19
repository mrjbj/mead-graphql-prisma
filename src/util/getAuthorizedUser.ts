import { SetVerror } from './applicationError'
import jwt from 'jsonwebtoken'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { JWT_SECRET } from './constants'

export type AppToken = {
  userId: string,
  iat: number
}

//
export const getAuthorizedUser = (request: ContextParameters) => {
  const header = request.request.headers.authorization

  if (!header) {
    throw SetVerror(undefined, `Authentication Required`)
  }
  const token = header.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, JWT_SECRET) as AppToken
  return decodedToken.userId
}