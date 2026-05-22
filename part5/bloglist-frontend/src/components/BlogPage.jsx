import { useParams } from 'react-router-dom'
import Blog from './Blog'

const BlogPage = ({ blogs, handleLike, deleteBlog, user }) => {
  const { id } = useParams()

  const blog = blogs.find(b => b.id === id)

  if (!blog) return null

  return (
    <Blog
      blog={blog}
      handleLike={handleLike}
      deleteBlog={deleteBlog}
      user={user}
    />
  )
}

export default BlogPage