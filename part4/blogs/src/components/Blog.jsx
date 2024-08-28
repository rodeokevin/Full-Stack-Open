const Blog = ({ blog, handleUpvote, handleDelete }) => {

  return (
    <li className="blog">
      Title: {blog.title} Author: {blog.author} URL: <a href={blog.url}>{blog.url}</a> Upvotes: {blog.likes}
      <button onClick={handleUpvote}>Like</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Blog