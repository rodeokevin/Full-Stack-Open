const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// 4.8
test('all blogs are returned and in json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

// 4.9
test('the identifier property is id and not _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert(blogs.reduce((acc, curr) => {
    return 'id' in curr && !('_id' in curr)
  }, false))
})

// 4.10
test('the blog is successfully saved to database', async () => {
  const newBlog = {
    title: 'newBLOG',
    author: 'k-dawg',
    url: 'nonexistant.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  assert(blogsAtEnd.some((b) => b.title === newBlog.title && b.author === newBlog.author && b.url === newBlog.url))
})

// 4.11
test('likes default to 0 if not included in request', async () => {
  const newBlog = {
    title: 'noLikesDefined',
    author: 'k-man',
    url: 'nolikes.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  assert(response.body.likes === 0)
})

// 4.12
test('missing title or url properties result in 400 Bad Request', async () => {
  const newBlog = {
    author: 'NO TITLE NO URL',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

// 4.13
test('a blog can be deleted', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert(!blogsAtEnd.some((b) => b.title === blogToDelete.title && b.author === blogToDelete.author && b.url === blogToDelete.url))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

// 4.14
test('the blog can be liked', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToLike = blogsAtStart[0]
  const newBlogObject = { ...blogToLike, likes: blogToLike.likes + 1 }

  await api
    .put(`/api/blogs/${blogToLike.id}`)
    .send(newBlogObject)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  assert(blogsAtEnd[0].likes === blogsAtStart[0].likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})