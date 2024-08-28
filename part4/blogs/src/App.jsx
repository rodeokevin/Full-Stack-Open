import { useState, useEffect } from 'react'
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import ErrorNotif from "./components/ErrorNotif"
import SuccessNotif from "./components/SuccessNotif"
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const [newAuthor, setNewAuthor] = useState('')
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const [newURL, setNewURL] = useState('')
  const handleURLChange = (event) => {
      setNewURL(event.target.value)
    }
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  const resetFields = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  // Delete a blog
  const handleDelete = (blog) => {
    if (window.confirm(`delete ${blog.title}?`)) {
      blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setSuccessMessage(`${blog.title} was deleted`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  // Like a blog
  const handleUpvote = (blog) => {
    const newBlogObject = {...blog, likes: blog.likes + 1}
    blogService
      .update(blog.id, newBlogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
      })
      .catch(error => {
        setErrorMessage(setErrorMessage(error.response.data.error))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // Add a blog
  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0
    }

    // If the URL already exists, treat it as updating the title and author fields
    const findBlog = (url) => {
      const found = blogs.find(blog => blog.url.toLowerCase() === url.toLowerCase())
      return found ? found : null
    }

    const foundBlog = findBlog(newBlogObject.url)

    // Update a blog if the URL already exists
    if (foundBlog) {
      if (window.confirm(`${newBlogObject.url} is already added to blogs. Update title and author information?`)) {
        const updatedBlogObject = {
          title: newTitle,
          author: newAuthor,
          url: newURL,
          likes: foundBlog.likes
        }
        
        blogService
          .update(foundBlog.id, updatedBlogObject)
          .then(returnedBlog => {
            resetFields()
            setBlogs(blogs.map(b => b.id === foundBlog.id ? returnedBlog : b))
            setSuccessMessage(`${updatedBlogObject.title} was successfully updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(setErrorMessage(error.response.data.error))
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    // If URL didn't exist, create a new blog
    else {
      blogService
      .create(newBlogObject) 
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        resetFields()
        setSuccessMessage(`${newBlog.title} was successfully added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }



  return (
    <div>
      <h1>Welcome to Blogs!</h1>
      <ErrorNotif message={errorMessage} />
      <SuccessNotif message={successMessage} />
      
      <h2>Add a new blog:</h2>

      <BlogForm addBlog={addBlog} newTitle={newTitle} handleTitleChange={handleTitleChange}
                newAuthor={newAuthor} handleAuthorChange={handleAuthorChange}
                newURL={newURL} handleURLChange={handleURLChange} />

      <h2>Blogs list:</h2>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpvote={() => handleUpvote(blog)} handleDelete={() => handleDelete(blog)}/>
        )}
      </ul>
    </div>
  )
}

export default App