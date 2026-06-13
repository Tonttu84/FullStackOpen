import Blog from './Blog'
import { useParams } from 'react-router-dom'
import PageNotFound from './PageNotFound'
import { useBlogs } from '../stores/blogStore'

const BlogPage = ({ user }) => {
  const { id } = useParams()

  const { blogs } = useBlogs()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return <PageNotFound></PageNotFound>

  return <Blog blog={blog} user={user} />
}

export default BlogPage
