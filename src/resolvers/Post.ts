// this is a relation resolver
// called by any query that needs to resolve Post non-scalar type
//  (e.g. comments.post, user.post)
import { Context, User, Post, Comment } from '../types/types'

const Post = {
  author(parent: Post, { db }: Context): User | undefined {
    // where users.id === post.author
    return db.users.find(item => item.id === parent.author)
  },
  comments(parent: Post, { db }: Context): Comment[] {
    // where comments.post === post.id
    return db.comments.filter(item => item.post === parent.id)
  }
}

export { Post as default }