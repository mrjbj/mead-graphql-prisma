// Interface for mutation object defined in types as "AppMutation"
// GQL serves are 'promise aware' clients so we can return promise from async methods
// rather than having to "await" within each method first  // (1)
// JSON Web Tokens:
//  - jsonwebtoken.sign takes {payload} and secret to ensure that payload not altered. // (2)
//  - jwt.decode{payload} is public information -> anyone can decode it via jwt.decode()  // (3)
// - jwt.verify() both decodes and verifies that payload not altered  jwt.verify(token, secret) // (4)
// - jwt.compare(plainText, hashedText) to compare hashed database password to password presented at login

import { AppMutation, AuthorizationPayload, User } from '../types/types'
import Assert from 'assert'
import { Prisma } from 'prisma-binding'
import { SetVerror } from '../util/applicationError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getCurrentUser, AppToken } from '../util/getCurrentUser'
import { JWT_SECRET } from '../util/constants'

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

    const failMsg = 'Login falied.  Username or password not found or matched.  Try again.'
    const user = await prisma.query.user({ where: { email: args.email } }) as User
    if (!user) {
      throw SetVerror(undefined, failMsg, { propertyName: "user.email", propertyValue: args.email, log: true })
    }
    const isMatch = await bcrypt.compare(args.password, user.password)
    if (!isMatch) {
      throw SetVerror(undefined, failMsg, { propertyName: "user.password", propertyValue: user.password, log: true })
    }
    return {
      token: jwt.sign({ userId: user.id } as AppToken, JWT_SECRET),
      user: user
    }
  },
  async createUser(_parent, args, { prisma }, _info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.data.email, "string", `Assert: [args.data.email] not a string. [${args.data.email}]`)
    Assert.strictEqual(typeof args.data.name, "string", `Assert: [args.data.name] not a string. [${args.data.email}]`)

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
      token: jwt.sign({ userId: newUser.id } as AppToken, JWT_SECRET)
    } as AuthorizationPayload
  },
  async updateUser(_parent, args, { prisma, request }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    const userId = getCurrentUser(request)
    return prisma.mutation.updateUser({ where: { id: userId }, data: args.data }, info)
  },
  async deleteUser(_parent, _args, { prisma, request }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    const userId = getCurrentUser(request)
    return prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
  async createPost(_parent, args, { prisma, request }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.data.title, "string", `AssertError: [args.data.title] not a string. [${args.data.title}]`)

    const userId = getCurrentUser(request)
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: { connect: { id: userId } }
      }
    }, info)
  },
  async  deletePost(_parent, args, { prisma, request }, info) {
    Assert.strictEqual(typeof args.id, "string", `AssertionError: [args.id] not a string. [${args.id}]`)
    const authenticatedUserId = getCurrentUser(request)
    const postOwnedByAuthenticatedUser = await prisma.exists.Post({ id: args.id, author: { id: authenticatedUserId } })
    if (!postOwnedByAuthenticatedUser) {
      throw SetVerror(undefined, `You can only delete your own posts.`)
    }
    return prisma.mutation.deletePost({ where: { id: args.id } }, info)
  },
  // must be authenticated and author of post to be updated.
  // if post is going from published to unpublished, then delete any associated comments.
  async updatePost(_parent, args, { prisma, request }, info) {
    Assert.strictEqual(typeof args.id, "string", `AssertionError: [args.id] not a string. [${args.id}]`)
    const currentUserId = getCurrentUser(request)
    const isPublished = await prisma.exists.Post({ id: args.id, published: true })
    const postOwnedByCurrentUser = await prisma.exists.Post({ id: args.id, author: { id: currentUserId } })
    if (!postOwnedByCurrentUser) {
      throw SetVerror(undefined, `You cannot update posts created by other users.`)
    }
    if (isPublished && !args.data.published) {
      // is owned by current user and going from published to unpublished.
      const countDeleted = await prisma.mutation.deleteManyComments({
        where: { post: { id: args.id } }
      })
      console.log(`Comments deleted from unpublishing: [${countDeleted}]`)
    }
    return prisma.mutation.updatePost({
      where: { id: args.id },
      data: args.data
    }, info)
  },
  // must be authenticated
  // can only create comments on posts in published status.
  async createComment(_parent, args, { prisma, request }, info) {
    const currentUserId = getCurrentUser(request)
    const post = await prisma.query.post({ where: { id: args.data.post } })
    if (!post.published) {
      throw SetVerror(undefined, `Comments not allowed on unpublished posts.`)
    }
    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        post: { connect: { id: args.data.post } },
        author: { connect: { id: currentUserId } }
      }
    }, info)
  },
  async updateComment(_parent, args, { prisma, request }, info) {
    const currentUserId = getCurrentUser(request)
    const isOwnedByCurrentUser = await prisma.exists.Comment({ id: args.id, author: { id: currentUserId } })

    if (!isOwnedByCurrentUser) {
      throw SetVerror(undefined, `You can only update your own comments.`)
    }
    return prisma.mutation.updateComment({
      data: args.data,
      where: { id: args.id }
    }, info)
  },
  async deleteComment(_parent, args, { prisma, request }, info) {
    const currentUserId = getCurrentUser(request)
    const isOwnedByCurrentuser = await prisma.exists.Comment({ id: args.id, author: { id: currentUserId } })
    if (!isOwnedByCurrentuser) {
      throw SetVerror(undefined, `You can only delete your own comments.`)
    }
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info)
  }
}

export { Mutation as default }