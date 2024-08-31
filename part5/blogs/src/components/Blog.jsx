import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const showDelete = { display: currentUser.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div style={hideWhenVisible}>
        <div className='titleAuthorLess'>{blog.title}, by {blog.author}<button onClick={toggleVisibility}>view</button></div>
      </div>
      <div style={showWhenVisible}>
        <div className='titleAuthorMore'>{blog.title}, by {blog.author}<button onClick={toggleVisibility}>hide</button></div>
        <div className='url'>URL {blog.url}</div>
        <div className='likes'>Likes: {blog.likes} <button onClick={handleLike}>Like</button></div>
        <div className='user'>Added by: {blog.user.name}</div>
        <button style={showDelete} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default Blog