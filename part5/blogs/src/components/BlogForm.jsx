import { useState, forwardRef, useImperativeHandle } from 'react'

const BlogForm = forwardRef(({ updateBlog, createBlog, blogs, currentUser }, refs) => {

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

  const resetFields = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  useImperativeHandle(refs, () => {
    return {
      resetFields
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
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
        updateBlog(foundBlog.id, updatedBlogObject)
      }
      
    }
    else {
      createBlog(newBlogObject)
    }
  }

    return (
      <>
        <h2>Add a new blog:</h2>
        <form onSubmit={addBlog}>
        Title:
        <div>
          <input value={newTitle} onChange={handleTitleChange} placeholder='title'/>
        </div>
        Author:
        <div>
          <input value={newAuthor} onChange={handleAuthorChange} placeholder='author'/>
        </div>
        URL:
        <div>
          <input value={newURL} onChange={handleURLChange} placeholder='url'/>
        </div>
          <button type="submit">save</button>
        </form>
      </>
    )
})

BlogForm.displayName = 'BlogForm'
export default BlogForm