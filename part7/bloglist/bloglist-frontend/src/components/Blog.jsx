import {
  BlogContainer,
  BlogTitle,
  BlogMeta,
  BlogActions,
  DangerButton,
  OutlineButton,
} from '../styles/components'
import PageNotFound from './PageNotFound'
import { useBlogs } from '../stores/blogStore'
import {  useNavigate } from 'react-router-dom'

const Blog = ({ blog,  user }) => {
  console.dir(blog)

  const navigate = useNavigate()

   const {  deleteBlog, addLike } = useBlogs()

    const handleDelete = async () => {
    await deleteBlog(blog)
    navigate('/')
  }

  if (!blog) return <PageNotFound></PageNotFound>

  return (
    <BlogContainer>
      <BlogTitle>{blog.title}</BlogTitle>

      <BlogMeta>
        by {blog.author}
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        Added by {blog.user.name}
      </BlogMeta>

      <BlogActions>
        {blog.likes} likes
        {user && (
          <OutlineButton onClick={() => addLike(blog)}>LIKE</OutlineButton>
        )}
        {user && blog.user.username == user.username && (
          <DangerButton onClick={() => handleDelete()}>REMOVE</DangerButton>
        )}
      </BlogActions>
    </BlogContainer>
  )
}

export default Blog
