import { AppSubscription } from '../types/types'
import { getCurrentUser } from '../util/getCurrentUser'
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
const Subscription: AppSubscription = {
  comment: {
    async subscribe(_parent, args, { prisma }, info) {
      // subscribe to comments associated with a particular post.
      return prisma.subscription.comment({
        where: { node: { post: { id: args.postId } } }
      }, info)
    }
  },
  post: {
    async subscribe(_parent, args, { prisma }, info) {
      return prisma.subscription.post({
        where: { node: { published: args.published } }
      }, info)
    }
  },
  myPost: {
    async subscribe(_parent, _args, { prisma, request }, info) {
      const currentUser = getCurrentUser(request)
      return prisma.subscription.post({
        where: { node: { author: { id: currentUser } } }
      }, info)
    }
  }
}

export { Subscription as default }