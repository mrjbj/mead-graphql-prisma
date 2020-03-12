import { Context, User, Post, Comment, ResolverMap, DynamicObject } from '../types/types'
import { NOT_FOUND, APPLICATION_ERROR } from '../util/constants'
import { v4 as uuidv4 } from "uuid"
import Verror from 'verror'
import { SetVerror, jStringify } from '../util/applicationError'
import { Mutation, UserCreateInput } from '../generated/PrismaBindings'
import { GraphQLResolveInfo } from 'graphql'
import Assert from 'assert'
import { Prisma } from 'prisma-binding'

const Mutation = {
  async createUser(_parent: any, args: { data: { name: string, email: string } }, { prisma }: Context, info: any): Promise<User> {
    Assert(prisma instanceof Prisma, `Assert: [prisma] not instance of Prisma [${prisma}]`)
    Assert.strictEqual(typeof args.data.email, "string", `Assert: [args.data.email] not a string. [${args.data.email}]`)
    Assert.strictEqual(typeof args.data.name, "string", `Assert: [args.data.name] not a string. [${args.data.email}]`)
    const emailTaken = await prisma.exists.User({ email: args.data.email })
    if (emailTaken) {
      throw SetVerror(undefined, "Email address already in use.", "email", args.data.email)
    }
    const newUser = await prisma.mutation.createUser({ data: args.data }, info)
    return newUser
  },
  updateUser(args: { id: string, data: Partial<User> }, { db }: Context): User | Error {
    // find id, if found
    // update email, if not duplicate
    // update name, no worry
    // update age, if !undefined (null is okay, GQL will check for Int at runtime)   // (1)
    const { id, data } = args
    const user = db.users.find(item => item.id === id)
    if (!user) {
      throw new Error(`User [${id}] not found.`)
    }
    if (typeof data.email === 'string') {
      // argument provided, check if not unique before udpating
      const duplicate = db.users.some(item => item.email === data.email && item.id !== id)
      if (duplicate) {
        throw new Error(`Email [${data.email}] registered already.`)
      } else {
        user.email = data.email
      }
    }
    if (typeof data.name === 'string') {
      user.name = data.name
    }
    if (typeof data.age !== 'undefined') {       // (1)
      user.age = data.age
    }
    return user
  },
  deleteUser(args: { id: string }, { db }: Context): User | Error {
    // find user and abort if not found
    // delete user,
    //    delete posts related to that user,
    //    delete comments associated with any posts created by that user,
    //    delete comments created by that user.
    const userIndex = db.users.findIndex(item => item.id === args.id)
    if (userIndex === NOT_FOUND) {
      throw new Error(`User [${args.id}] not found.`)
    }
    // slice returns [], even if containing only one element
    const deletedUser = db.users.splice(userIndex, 1)[0]

    db.posts = db.posts.filter(postItem => {
      // if postItem was created by deletedUser then
      //   - only keep comments not tied to that post. (1)
      //   - don't keep the post itself (e.g keep the ones that !match). (2)
      const match = postItem.author === deletedUser.id
      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== postItem.id) // (1)
      }
      return !match  // (2)
    })
    // keep only comments not created by that user
    db.comments = db.comments.filter(commentItem => commentItem.author !== deletedUser.id)
    return deletedUser
  },
  createPost(args: Post, { db, pubsub }: Context) {
    const userFound = db.users.some(item => item.id === args.author)
    if (!userFound) {
      // invalid foreign key
      throw new Error(`No user found for id [${args.author}].`)
    }
    const duplicatePost = db.posts.some(item => item.title === args.title)
    if (duplicatePost) {
      throw new Error(`Post already exists with title [${args.title}]`)
    }
    // create new, save and return
    const newPost: Post = {
      id: uuidv4(),
      ...args
    }
    db.posts.push(newPost)
    // only release if published
    if (newPost.published) {
      pubsub.publish('Posts', {
        post: {
          mutation: 'CREATED',
          data: newPost
        }
      })
    }
    return newPost
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