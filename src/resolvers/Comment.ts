// this is a relation resolver
// called by any query that needs to resolve the Comment! non-scalar type
//  (e.g. post.comments, user.comments)

const Comment = {}
export { Comment as default }