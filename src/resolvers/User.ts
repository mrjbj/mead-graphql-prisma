// this is a relation resolver
// called by any query that needs to resolve a non scaler type
//  (e.g. comments.author, posts.author)
import { Context, User, Post, Comment } from '../types/types'

const User = {
  posts(parent: User, { db }: Context): Post[] {
    return db.posts.filter(item => item.author === parent.id)
  },
  comments(parent: User, { db }: Context): Comment[] {
    // comments.author === user.id
    return db.comments.filter(item => item.author === parent.id)
  }
}

export { User as default }