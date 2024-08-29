const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://kevinqinzw2:${password}@cluster0.n8alr.mongodb.net/testBlogs?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

  const blog = new Blog({
    title: 'VS Code rest client is a pretty handy tool',
    author: 'kev',
    url: 'whatever.com',
    likes: '10000'
  })

  blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
  })

  Blog.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
})