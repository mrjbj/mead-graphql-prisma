import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: './src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

/*
 * prisma.query.users(undefined, '{id name  posts {id title comments{text } } }').then((data: any) => {
 *   console.log(JSON.stringify(data, null, 4))
 * })
 */

/*
 * const wrapper = async () => {
 *   const data = await prisma.query.comments(undefined, "{id text author {id name email}}")
 *   console.log(JSON.stringify(data, null, 2))
 * }
 */

/*
 * const wrapper = async () => {
 *   const data = await prisma.mutation.createPost({
 *     data: {
 *       title: "Why I came to live amongst you on earth.",
 *       body: "It's understandable you doubt and were lost.  I came to make it easy for you, to forgive and show you the way, so that you might see me and know more confidently what I think and how much I care.",
 *       published: true,
 *       author: { connect: { id: "ck7hxpakq04jg0824rluur2mj" } }
 *     }
 *   }, "{ id title body published}")
 *   console.log(JSON.stringify(data, null, 2))
 * }
 */

/*
 * const wrapper = async () => {
 *   await prisma.mutation.updatePost({
 *     data: { published: true },
 *     where: { id: "ck7idj39n074o0824o1d3k3b1" }
 *   }, "{id title body published}"
 *   )
 *   const posts = await prisma.query.posts(undefined, "{id title body published}")
 *   console.log(JSON.stringify(posts, null, 2))
 * }
 */
const TAB_SPACES = 2
const wrapper = async () => {
  const jason = await prisma.mutation.createComment({
    data: {
      text: `I'll say it again... "Now that's a God worthy of worship!"`,
      post: { connect: { id: 'ck7idj39n074o0824o1d3k3b1' } },
      author: { connect: { id: 'ck7hw1chn02zw0824ms8bym8k' } }
    }
  }, '{id text }')
  console.log(JSON.stringify(jason, null, TAB_SPACES))
}

wrapper()
