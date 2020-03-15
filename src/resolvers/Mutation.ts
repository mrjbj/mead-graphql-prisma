// Interface for mutation object defined in types as "AppMutation"
// GQL serves as 'promise aware' client so can return promise from async methods
// rather than having to "await" within each method first  // (1)
import { AppMutation } from '../types/types'
import Assert from 'assert'
import { Prisma } from 'prisma-binding'
import { SetVerror } from '../util/applicationError'
import bcrypt from 'bcryptjs'

const Mutation: AppMutation = {
  async createUser(_parent, args, { prisma }, info) {
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
    return prisma.mutation.createUser({
      data: { ...args.data, password }
    }, info
    )  // (1)
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