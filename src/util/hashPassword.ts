import bcrypt from 'bcryptjs'
import { SetVerror } from './applicationError'

export const hashPassword = (password: string): string => {
  if (!password) {
    throw SetVerror(undefined, `password is required.`)
  } else {
    if (password.length < 8) {
      throw SetVerror(undefined, `Password length must be 8 characters or more.`)
    }
  }
  return bcrypt.hashSync(password, 10)
}