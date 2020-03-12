// Interface for mutation object defined in types as "AppMutation"
// GQL serves as 'promise aware' client so can return promise from async methods
// rather than having to "await" within each method first  // (1)
import { Context, Post, Comment, AppMutation } from '../types/types'
import { NOT_FOUND, APPLICATION_ERROR } from '../util/constants'
import { v4 as uuidv4 } from "uuid"
import { SetVerror, jStringify } from '../util/applicationError'
import Assert from 'assert'
import { Prisma } from 'prisma-binding'

const Mutation: AppMutation = {
  async createUser(_parent, args, { prisma }, info) {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.data.email, "string", `Assert: [args.data.email] not a string. [${args.data.email}]`)
    Assert.strictEqual(typeof args.data.name, "string", `Assert: [args.data.name] not a string. [${args.data.email}]`)
    return prisma.mutation.createUser({ data: args.data }, info)  // (1)
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
  // if post.published & change, then send UPDATE
  // if post.!published and then published, send CREATE
  // if post.published and then published, send DELETE
  updatePost(args: { id: string, data: Partial<Post> }, { db, pubsub }: Context): Post {
    const { id, data } = args
    const post = db.posts.find(item => item.id === id)
    const originalPost = { ...post } as Post
    console.log(`originalPost: [${JSON.stringify(originalPost)}]`)
    let msgType = 'NONE'
    if (!post) {
      throw new Error(`Post [${id}] not found.`)
    }
    // title, body, published are all required in schema, so can check for type w/o null
    if (typeof data.title === 'string') {
      // argument supplied, so update it
      post.title = data.title
    }
    if (typeof data.body === 'string') {
      post.body = data.body
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (originalPost.published && !post.published) {
        // was published but not now, so delete
        msgType = 'DELETED'
      } else if (!originalPost.published && post.published) {
        // was not published is published now, so create
        msgType = 'CREATED'
      } else if (post.published) {
        // is published and didn't change, so publish update
        msgType = 'UPDATE'
      }
      // if going from published to not return back the originalPost,
      // so as not to "leak" the new edits, which are !published now
      // and therefore private  (1)
      if (msgType !== 'NONE') {
        const payload = {
          post: {
            mutation: msgType,
            data: (msgType === 'DELETED' ? originalPost : post),  // (1)
          }
        }
        console.log(`Payload: [${JSON.stringify(payload)}]`)
        pubsub.publish('Posts', payload)
      }

    }
    return post
  },
  deletePost(args: { id: string }, { db, pubsub }: Context): Post {
    // splice out post matching args.id (1)
    // keep comments where comments.post !== args.id (2)
    // return deleted post item (3)
    const deletePostAtIndex = db.posts.findIndex(item => item.id === args.id)
    if (deletePostAtIndex === NOT_FOUND) {
      throw new Error(`Can't delete.  Post.id [${args.id}] not found.`)
    }
    // note array destructuring, below
    const [deletedPost] = db.posts.splice(deletePostAtIndex, 1) // (1)
    db.comments = db.comments.filter(item => item.post !== args.id) // (2)

    // posts: property name matches subscription property defined in schema:
    // 'Posts' matches channel name defined by asyncIterator
    // paylod matches PostSubscriptionPayload defined in schema
    if (deletedPost.published) {
      pubsub.publish('Posts', {
        post: {
          mutation: 'DELETED',
          data: deletedPost
        }
      })
    }
    return deletedPost // (3)
  },
  createComment(args: Comment, { db, pubsub }: Context): Comment | Error {
    // user must exist
    // post must exist (and be published)
    const userExists = db.users.some(item => item.id === args.author)
    if (!userExists) {
      throw new Error(`Cannot create commnet.  User [${args.author}] does not exist.`)
    }
    const relatedPost = db.posts.find(item => item.id === args.post)
    if (!relatedPost) {
      throw new Error(`Cannot create comment.  Post [${args.post}] not found.`)
    }
    if (!relatedPost.published) {
      throw new Error(`Cannot create comment.  Post [${relatedPost.title}] is not published.`)
    }
    const newComment = {
      id: uuidv4(),
      ...args
    }
    db.comments.push(newComment)
    const payload = {
      comment: {
        mutation: 'CREATE',
        data: newComment
      }
    }
    pubsub.publish(`Comments-${args.post}`, payload)
    return newComment
  },
  updateComment(args: { id: string, data: Partial<Comment> }, { db, pubsub }: Context): Comment {
    const { id, data } = args
    const comment = db.comments.find(item => item.id === id)
    if (!comment) {
      throw new Error(`Comment [${id}] not found.`)
    }
    if (typeof data.text === 'string') {
      comment.text = data.text
      const payload = {
        comment: {
          mutation: 'UPDATE',
          data: comment
        }
      }
      pubsub.publish(`Comments-${comment.post}`, payload)
    }
    return comment
  },
  deleteComment(arg: { id: string }, { db, pubsub }: Context): Comment {
    const indexOfDeletedCommnet = db.comments.findIndex(item => item.id === arg.id)
    if (indexOfDeletedCommnet === NOT_FOUND) {
      throw new Error(`Can't delete.  Comment [${arg.id}] not found.`)
    }
    const [deletedComment] = db.comments.splice(indexOfDeletedCommnet, 1)
    const payload = {
      comment: {
        mutation: 'DELETE',
        data: deletedComment
      }
    }
    pubsub.publish(`Comments-${deletedComment.post}`, payload)
    return deletedComment
  }
}

export { Mutation as default }