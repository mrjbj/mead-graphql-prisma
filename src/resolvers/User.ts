import { getCurrentUser } from '../util/getCurrentUser'
import { UserResolver, Post } from '../types/types'
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
// - fragment needed to ensure that selection set passed in from parent specifies
//   fields needed in resolver logic.  In email, for example, we need the user.id
//   field specified since logic specifies currentUser == parent.id.  (If {id} were
//   not in selection set, this logic would bomb).  Fragment ensures it will be
//   available. // (3)  Also note that parent.email does not need to be specified
//   the fragment because the resolver itself is for email().  So it's certain to
//   have been specified in the first place.

// this is synchronous, does not return a promise
const User: UserResolver = {
    email: {
        fragment: 'fragment userId on User {id}', // (3)
        resolve(parent, _args, { request }, _info): string | null {
            // (2)
            const currentUser = getCurrentUser(request, false)
            const returner =
                currentUser && parent.id === currentUser ? parent.email : null
            return returner
        },
    },
    posts: {
        fragment: 'fragment userId on User {id}',
        resolve(parent, _args, { prisma }, _info): Promise<Post[]> {
            return prisma.query.posts({
                where: {
                    published: true,
                    author: { id: parent.id },
                },
            })
        },
    },
} // (1)

export { User as default }
