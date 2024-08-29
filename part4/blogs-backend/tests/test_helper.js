const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}