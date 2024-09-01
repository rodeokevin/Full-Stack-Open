import { useState, useEffect, useRef } from 'react'
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import ErrorNotif from "./components/ErrorNotif"
import SuccessNotif from "./components/SuccessNotif"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
      .catch(error => console.log(error.response.data.error))
  }, [user])

  // Login
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

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
  const handleLike = (blog) => {
    const newBlogObject = {...blog, likes: blog.likes + 1}
    blogService
      .update(blog.id, newBlogObject)
      .then(() => {
        setBlogs(blogs.map(b => b.id === blog.id ? {...b, likes: b.likes + 1} : b))
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  // Add a blog
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat({...newBlog, user: { name: user.name, username: user.username }}))
        setSuccessMessage(`${newBlog.title} by ${newBlog.author} was successfully added`)
        blogFormToggleRef.current.toggleVisibility()
        blogFormRef.current.resetFields()
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

  // Update a blog
  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === id ? {...b, title: returnedBlog.title, author: returnedBlog.author } : b))
        setSuccessMessage(`${blogObject.title} was successfully updated`)
        blogFormToggleRef.current.toggleVisibility()
        blogFormRef.current.resetFields()
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
  
  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />      
  )

  const blogFormToggleRef = useRef()
  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormToggleRef}>
      <BlogForm createBlog={addBlog} updateBlog={updateBlog} blogs={blogs} ref={blogFormRef} currentUser={user} />
    </Togglable>
  )

  
  if (!user) {
    return (
      <div>
        <ErrorNotif message={errorMessage} />
        <SuccessNotif message={successMessage} />
        {loginForm()}
      </div>
    )
  }
  
  return (
    <div>
      
      <h1>Welcome to Blogs!</h1>
      <ErrorNotif message={errorMessage} />
      <SuccessNotif message={successMessage} />
      
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
      {blogForm()}

      <h2>Blogs list:</h2>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog)} currentUser={user}/>
        )}
      </div>
    </div>
  )
}

export default App