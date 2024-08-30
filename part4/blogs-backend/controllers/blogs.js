// File for route handlers
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST a new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  /*
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  */

  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({
      error: 'cannot have empty fields'
    })
  }

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: request.user.id
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()

  return response.status(201).json(savedBlog)
})


// DELETE a blog
blogsRouter.delete('/:id', async (request, response) => {

  /*
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  */
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  else {
    response.status(400).json({
      error: 'only the creator can delete the blog'
    })
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({
      error: 'cannot have empty fields'
    })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter