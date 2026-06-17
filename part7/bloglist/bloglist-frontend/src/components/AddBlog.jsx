import { useField } from '../hooks/useField'
import { useNavigate } from 'react-router-dom'
import { Button, BoxInput } from '../styles/components'
import { useBlogs } from '../stores/blogStore'

const AddBlog = ({ createBlog }) => {
  const navigate = useNavigate()

  const title = useField('title')
  const author = useField('author')
  const url = useField('text')

  const { addBlog } = useBlogs()

  const handleSubmit = async (event) => {
    event.preventDefault()

    createBlog?.({
      title: title.value,
      author: author.value,
      url: url.value,
    }) //does nothing for testing only

    await addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    navigate('/')
  }

  const { reset: _rt, ...titleProps } = title
  const { reset: _ra, ...authorProps } = author
  const { reset: _ru, ...urlProps } = url

  return (
    <div>
      <p></p>

      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <BoxInput
            aria-label="title"
            id="title"
            placeholder="title"
            {...titleProps}
          />
        </div>

        <div>
          <BoxInput
            aria-label="author"
            id="author"
            placeholder="author"
            {...authorProps}
          />
        </div>

        <div>
          <BoxInput aria-label="url" id="url" placeholder="url" {...urlProps} />
        </div>

        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

export default AddBlog
