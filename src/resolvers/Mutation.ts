// Interface for mutation object defined in types as "AppMutation"
// GQL serves are 'promise aware' clients so we can return promise from async methods
// rather than having to "await" within each method first  // (1)
// JSON Web Tokens:
//  - jsonwebtoken.sign takes {payload} and secret to ensure that payload not altered. // (2)
//  - jwt.decode{payload} is public information -> anyone can decode it via jwt.decode()  // (3)
// - jwt.verify() both decodes and verifies that payload not altered  jwt.verify(token, secret) // (4)
// - jwt.compare(plainText, hashedText) to compare hashed database password to password presented at login

/*
const token = jwt.sign({ id: 46 }, 'mysecret') // (2)
console.log(token)
const decoded = jwt.decode(token) // (3)
console.log(decoded)
const decode2 = jwt.verify(token, 'mysecret')
console.log(decode2)
const isMatch = await jwt.compare(password, hashedPassword)
*/



import { AppMutation, AuthorizationPayload, User } from '../types/types'
import Assert from 'assert'
import { Prisma } from 'prisma-binding'
import { SetVerror } from '../util/applicationError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const Mutation: AppMutation = {
  // 1. hash and save new password in database // (1)
  // 2. return JSON web token for authorization back to client // (2)
  // 3. note that 'info' not provided as paremeter to prisma.mutation.createUser() in this case.
  //    - info contains metadata about query passed in from AppMutation.createUser(), which is looking
  //      for attributes 'token' and/or 'user'.
  //    - if we relay that selection set into the prisma bindings on server (via prisma.mutation.createUser()),
  //      we would be asking for 'token' or 'user' elements that the server doesn't know how to resolve.
  //      Server only knows about properties defined for User via datamodel.prisma.
  //   -  by removing the 'info' parameter, client.createUser will be able to render anything
  //      directly returned by its resolver function (AppMutation.createUser()), which do include token and user  // (3)
  async login(_parent, args, { prisma }, _info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.email, "string", `Assert: [args.email] not a string. [${args.email}]`)
    Assert.strictEqual(typeof args.password, "string", `Assert: [args.password] not a string. [${args.password}]`)

    const failMsg = 'Login falied.  Username not found or password not match.  Try again.'
    const user = await prisma.query.user({ where: { email: args.email } }) as User
    if (!user) {
      throw SetVerror(undefined, failMsg, { propertyName: "user.email", propertyValue: args.email, log: true })
    }
    const isMatch = await bcrypt.compare(args.password, user.password)
    if (!isMatch) {
      throw SetVerror(undefined, failMsg, { propertyName: "user.password", propertyValue: user.password, log: true })
    }
    return {
      token: jwt.sign({ id: user.id }, 'thisismysecret'),
      user: user
    }
  },
  async createUser(_parent, args, { prisma }, _info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.data.email, "string", `Assert: [args.data.email] not a string. [${args.data.email}]`)
    Assert.strictEqual(typeof args.data.name, "string", `Assert: [args.data.name] not a string. [${args.data.email}]`)
    Assert.strictEqual(typeof args.data.password, "string", `Assert: [args.data.password] not a string. [${args.data.password}]`)

    if (!args.data.password) {
      throw SetVerror(undefined, `password is required.`)
    } else {
      if (args.data.password.length < 8) {
        throw SetVerror(undefined, `Password length must be 8 characters or more.`)
      }
    }
    const password = bcrypt.hashSync(args.data.password)
    const newUser: User = await prisma.mutation.createUser({ data: { ...args.data, password } }) // (1), (3)
    return {
      user: newUser,
      token: jwt.sign({ userId: newUser.id }, 'thisissecret')
    } as AuthorizationPayload
  },
  async updateUser(_parent, args, { prisma }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.id, "string", `AssertError: [args.id] not a string. [${args.id}]`)
    return prisma.mutation.updateUser({ where: { id: args.id }, data: args.data }, info)
  },
  async deleteUser(_parent, args, { prisma }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.id, "string", `AssertError: [args.id] not a string. [${args.id}]`)
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info)
  },
  async createPost(_parent, args, { prisma }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.data.title, "string", `AssertError: [args.data.title] not a string. [${args.data.title}]`)
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: { connect: { id: args.data.author } }
      }
    }, info)
  },
  async updatePost(_parent, args, { prisma }, info) {
    return prisma.mutation.updatePost({
      where: { id: args.id },
      data: args.data
    }, info)
  },
  deletePost(_parent, args, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id: args.id } }, info)
  },
  async createComment(_parent, args, { prisma }, info) {
    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        post: { connect: { id: args.data.post } },
        author: { connect: { id: args.data.author } }
      }
    }, info)
  },
  async updateComment(_parent, args, { prisma }, info) {
    return prisma.mutation.updateComment({
      data: args.data,
      where: { id: args.id }
    }, info)
  },
  async deleteComment(_parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info)
  }
}

export { Mutation as default }