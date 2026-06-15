import {
  BlogContainer,
  BlogTitle,
  BlogMeta,
  BlogActions,
  DangerButton,
  OutlineButton,
  HiddenLabel,
  Button,
  Input,
  BoxInput,
  CommentFormRow,
} from '../styles/components'
import PageNotFound from './PageNotFound'
import { useBlogs } from '../stores/blogStore'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const Blog = ({ blog, likeDummy, user }) => {
  const navigate = useNavigate()

  const comment = useField('text')

  const { deleteBlog, addLike, addComment } = useBlogs()

  const handleDelete = async () => {
    await deleteBlog(blog)
    navigate('/')
  }

  const handleLike = async () => {
    await addLike(blog)
    likeDummy?.()
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    await addComment(blog, comment.value)
    comment.reset()
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
        {user && <OutlineButton onClick={handleLike}>LIKE</OutlineButton>}
        {user && blog.user.username == user.username && (
          <DangerButton onClick={() => handleDelete()}>REMOVE</DangerButton>
        )}
      </BlogActions>
      <h2> comments </h2>

      <form onSubmit={handleSubmit}>
        <CommentFormRow>
          <HiddenLabel htmlFor="comment">addcomment</HiddenLabel>

          <BoxInput id="comment" placeholder="add a comment" {...comment} />

          <Button type="submit">add comment</Button>
        </CommentFormRow>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </BlogContainer>
  )
}

export default Blog
