import { useField } from '../hooks/useField'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { Button, BoxInput, HiddenLabel } from '../styles/components'
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
  })//does nothing for testing only

    await addBlog({
      title: title.value,
      author : author.value,
      url: url.value,
    })

    navigate('/')
  }

  return (
    <div>
      <p></p>

      <h2>create new</h2>

    

      <form onSubmit={handleSubmit}>
        <div>
          <HiddenLabel htmlFor="title">title</HiddenLabel>

          <BoxInput
            id="title"
            
            placeholder="title"
            {...title}
          />
        </div>

        <div>
          <HiddenLabel htmlFor="author">author</HiddenLabel>

          <BoxInput
            id="author"
        
            placeholder="author"
            {...author}
          />
        </div>

        <div>
          <HiddenLabel htmlFor="url">url</HiddenLabel>

          <BoxInput
            id="url"
            
            placeholder="url"
            
            {...url}
          />
        </div>

        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

export default AddBlog
