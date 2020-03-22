import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from './constants'

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}