const BlogForm = (props) => {
    return (
        <form onSubmit={props.addBlog}>
        Title:
        <div>
          <input value={props.newTitle} onChange={props.handleTitleChange} />
        </div>
        Author:
        <div>
          <input value={props.newAuthor} onChange={props.handleAuthorChange} />
        </div>
        URL:
        <div>
          <input value={props.newURL} onChange={props.handleURLChange} />
        </div>
        <button type="submit">save</button>
      </form>
    )
}

export default BlogForm