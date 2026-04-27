import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'


const AddBlog = ({ refreshBlogs }) =>  {

	const [notificationMessage, setNotificationMessage] = useState(null)



	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	
  
	const addtoBackend = async (event) => {
	  event.preventDefault()
  
	  const newBlog = { title, author, url }
  
	  try {
		const createdBlog = await blogService.create(newBlog)
		await refreshBlogs()
		console.log('Created blog:', createdBlog)
  
		

		setNotificationMessage({
			type: 'success',
			message: `${title} by ${author} added`
		  })
		  setTimeout(() => setNotificationMessage(null), 5000)

		  setTitle('')
		  setAuthor('')
		  setUrl('')  

		
	  } catch (error) {
		console.error('Error creating blog:', error)
		setNotificationMessage({
			type: 'error',
			message: 'Failed to add blog'
		  })
			  setTimeout(() => setNotificationMessage(null), 5000)
			  setTitle('')
			setAuthor('')
			setUrl('')
	  }
	}
  
	return (
	  <div>

		<p></p>

		<h2>create new</h2>

		<Notification notification={notificationMessage} />
  
		<form onSubmit={addtoBackend}>
		  <div>
			title
			<input
			  type="text"
			  value={title}
			  onChange={({ target }) => setTitle(target.value)}
			/>
		  </div>
  
		  <div>
			author
			<input
			  type="text"
			  value={author}
			  onChange={({ target }) => setAuthor(target.value)}
			/>
		  </div>
  
		  <div>
			url
			<input
			  type="text"
			  value={url}
			  onChange={({ target }) => setUrl(target.value)}
			/>
		  </div>
  
		  <button type="submit">create</button>
		</form>
	  </div>
	)
  }

export default AddBlog