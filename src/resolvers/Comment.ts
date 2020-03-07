// this is a relation resolver
// called by any query that needs to resolve the Comment! non-scalar type
//  (e.g. post.comments, user.comments)
import { Context, User, Post, Comment } from '../types/types'

const Comment = {
  author(parent: Comment, args, { db }: Context, info): User | undefined {
    return db.users.find(item => item.id === parent.author)
  },
  post(parent: Comment, args, { db }: Context, info): Post | undefined {
    // where posts.id === comment.post
    return db.posts.find(item => item.id === parent.post)
  }
}
export { Comment as default }