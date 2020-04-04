import bcrypt from 'bcryptjs'
import { SetVerror } from './applicationError'
import { MIN_PASSWORD_LENGTH, PASSWORD_SALT_LENGTH } from './constants'

export const hashPassword = (password: string): string => {
    if (!password) {
        throw SetVerror(undefined, `password is required.`)
    } else {
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw SetVerror(undefined, `Password length must be [${MIN_PASSWORD_LENGTH}] characters or more.`)
        }
    }
    return bcrypt.hashSync(password, PASSWORD_SALT_LENGTH)
}
