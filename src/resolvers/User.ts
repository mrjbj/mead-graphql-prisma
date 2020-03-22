import { getCurrentUser } from '../util/getCurrentUser'
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

const User = {
  email(parent, args, { prisma, request }, info) {     // (2)
    const currentUser = getCurrentUser(request)
    return (currentUser && parent.id === currentUser ? parent.email : null)
  }
} // (1)

export { User as default }