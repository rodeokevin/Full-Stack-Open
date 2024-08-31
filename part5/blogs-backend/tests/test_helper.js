const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'gato',
    author: 'mimi',
    url: 'cat.com',
    likes: 12,
  },
  {
    title: 'perro',
    author: 'doggo',
    url: 'dog.com',
    likes: 3,
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'salainen'
  },
  {
    username: 'kevin',
    name: 'rodeokevin',
    password: 'fullstack'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}