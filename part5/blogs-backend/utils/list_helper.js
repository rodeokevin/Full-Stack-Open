const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (acc, blog) => {
    return acc + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite
  })
}

const mostBlogs = (blogs) => {

  const authorBlogCount = {}

  // Store the number of blogs of each author in an array, the key is the author
  blogs.forEach(blog => {
    const curr = blog.author
    if (authorBlogCount[curr]) {
      authorBlogCount[curr] += 1
    }
    else {
      authorBlogCount[curr] = 1
    }
  })

  const topAuthor = Object.keys(authorBlogCount).reduce((top, author) => {
    return authorBlogCount[author] > authorBlogCount[top] ? author : top
  })

  return {
    author: topAuthor,
    blogs: authorBlogCount[topAuthor]
  }
}

const mostLikes = (blogs) => {
  const authorLikeCount = {}

  // Store the number of likes of each author in an array, the key is the author
  blogs.forEach(blog => {
    const curr = blog.author
    if (authorLikeCount[curr]) {
      authorLikeCount[curr] += blog.likes
    }
    else {
      authorLikeCount[curr] = blog.likes
    }
  })

  const topAuthor = Object.keys(authorLikeCount).reduce((top, author) => {
    return authorLikeCount[author] > authorLikeCount[top] ? author : top
  })

  return {
    author: topAuthor,
    likes: authorLikeCount[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}