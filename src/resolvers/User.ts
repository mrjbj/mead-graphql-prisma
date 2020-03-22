import { getCurrentUser } from '../util/getCurrentUser'
import { UserResolver } from '../types/types'
// this is a relation resolver
// called by any query that needs to resolve a non scaler type
//  (e.g. comments.author, posts.author)

// prisma has support for related tables built in.
// as long as the "info" parameter is provided in the parent resolver,
// then prisma will call the User entity resolver and resolve on its own
// via the foreign key references built into it.
// still need this "emtpy" resolver to make that part happen, though (1)
// scalar fields can just be returned as is, though it's possible to resolve
// them individually if special logic needs to be supplied as with the email
// field that should only be returned if match to authenticated user.  In such
// case, the parent argument will be the entity, (in this case User)  // (2)

// this is synchronous, does not return a promise
const User: UserResolver = {
  email: {
    fragment: 'fragment userId on User {id}',
    resolve(parent, _args, { request }, _info) {     // (2)
      const currentUser = getCurrentUser(request)
      const returner = (currentUser && parent.id === currentUser ? parent.email : null)
      return returner
    }
  },
  posts: {
    fragment: 'fragment userId on User {id}',
    async resolve(parent, _args, { prisma }, _info) {
      const relatedPosts = await prisma.query.posts({
        where: {
          published: true,
          author: { id: parent.id }
        }
      })
      return relatedPosts
    }
  }
} // (1)

export { User as default }