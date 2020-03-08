import { Context } from '../types/types'

// ------------
// - Subscription is reserved type name   (e.g. type Subscription{<subscription items>})   // (0)
// - Like Queries, Subscription items are declared in schema as methods,
//   (e.g. type Subscription {comment(postId: Int): Int}
// - However, Subscription items are implemented in their resolvers not as methods,
//   but as an object containing a property with name matching the declaration file   // (1)
//   and a value containing "subscribe()" method in ES6 syntax.                       // (2)
// - Subscribed properties are published via PubSub.publish(), which
//   specifies the socket's channelName and a payload object that must
//   contain a property with name matching to the subscription item name             // (3)
// - Notes (1) and (3) must match to the name defined in schema (0)
const Subscription = {
  comment: {
    subscribe(args: { postId: string }, ctx: Context) {
      // subscribe to comments associated with a particular post.
      //  1. make sure post exists
      //  2. setup channel to publish to that post
      const { db, pubsub } = ctx
      const post = db.posts.find(item => item.id === args.postId)
      if (!post) {
        throw new Error(`Cannot subscribe to comments.  Post [${args.postId}] does not exist.`)
      }
      return pubsub.asyncIterator(`Comments-${args.postId}`)
    }
  },
  post: {
    subscribe(ctx: Context) {
      return ctx.pubsub.asyncIterator(`Posts`)
    }
  }
}

export { Subscription as default }