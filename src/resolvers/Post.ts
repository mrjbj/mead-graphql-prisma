// this is a relation resolver
// called by any query that needs to resolve Post non-scalar type
//  (e.g. comments.post, user.post)

// prisma has support for related tables built in.
// as long as the "info" parameter is provided in the parent resolver,
// then prisma will call the User entity resolver and resolve on its own
// via the foreign key references built into it.
// still need this "emtpy" resolver to make that part happen, though (1)
const Post = {}

export { Post as default }