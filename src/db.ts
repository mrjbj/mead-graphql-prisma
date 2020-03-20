
import { Comment, DB, Post, User } from './types/types'

let users: User[] = [{
    id: '10',
    name: 'Jason',
    email: 'jason@brucejones.biz',
    password: 'GooberPatrol'
}, {
    id: '20',
    name: 'Ana',
    email: 'ana@anajones.com',
    password: 'GooberPatrol'
}, {
    id: '30',
    name: 'Roark',
    email: 'rbj250@nyu.edu',
    password: "GooberPatrol"
}]

let posts: Post[] = [{
    id: '1',
    title: 'Should we believe in God?',
    body: 'Yes, everyone should believe in God because we are in awe of creation and the fact of being alive',
    published: true,
    author: '10'
}, {
    id: '2',
    title: 'How much money should we save?',
    body: 'Live beneath your means. The amount remains (called savings) will allow you to keep living that way with less work over time.',
    published: false,
    author: '10'
}, {
    id: '3',
    title: 'Gettysburg Address',
    body: 'Four score and seven years ago, our forefathers brought forth a new nation, dedicated to the proposition that all men are created equal.',
    published: true,
    author: '30'
}, {
    id: '4',
    title: 'Why I like GraphQL programming',
    body: 'It is much better than REST.  Makes relational database endpoints easy to create and flexible to query',
    published: true,
    author: '10'
}
]
let comments: Comment[] = [{
    id: '100',
    text: 'I really enjoyed this article',
    author: '10',
    post: '1'
}, {
    id: '200',
    text: 'I believe in God, too!',
    author: '20',
    post: '1'
}, {
    id: '300',
    text: 'Party on, dude!',
    author: '20',
    post: '3'
}, {
    id: '400',
    text: 'Saving money should be taught from early on',
    author: '10',
    post: '2'
}, {
    id: '500',
    text: 'Wish I had known this all along!',
    author: '30',
    post: '2'
}
]

export const db: DB = {
    users,
    posts,
    comments
}