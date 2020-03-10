// this is a relation resolver
// called by any query that needs to resolve a non scaler type
//  (e.g. comments.author, posts.author)

// prisma has support for related tables built in.
// as long as the "info" parameter is provided in the parent resolver,
// then prisma will call the User entity resolver and resolve on its own
// via the foreign key references built into it.
// still need this "emtpy" resolver to make that part happen, though (1)

const User = {} // (1)

export { User as default }