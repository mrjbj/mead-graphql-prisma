import { getFirstName, isValidPassword } from "../src/user"

test('Should return first name when full name is given.', () => {
  const name = getFirstName('Jason Jones')
  expect(name).toBe('Jason')
})

test('Password cannot contain string "Password"', () => {
  expect(isValidPassword('gooberPasswordjffjfjjkj')).toBeFalsy()
})
test('Password cannot contain string "password"', () => {
  expect(isValidPassword('gooberpasswordjffjfjjkj')).toBeFalsy()
})
test('Password cannot be too short', () => {
  expect(isValidPassword('123')).toBeFalsy()
})
test('Password is valid', () => {
  expect(isValidPassword('GooberPatrol')).toBeTruthy()
})