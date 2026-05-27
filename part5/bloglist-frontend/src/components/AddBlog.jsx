import { useState } from 'react'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'



const AddBlog = ({ createBlog, notifMessage }) =>  {

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
	
		await createBlog({
		  title,
		  author,
		  url
		})
	
		setTitle('')
		setAuthor('')
		setUrl('')
		navigate('/')
	  }
  

	
	return (
	  <div>

		<p></p>

		<h2>create new</h2>

		<Notification notification={notifMessage} />
  
		<form onSubmit={handleSubmit}>
		  <div>
			<label>
				title
				<input
				type="text"
				value={title}
				onChange={({ target }) => setTitle(target.value)}
				/>
			</label>
		  </div>
		  
		  <div>
			<label>
				author
				<input
				type="text"
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
				/>
			</label>
		   </div>
  
  		  <div>	
			<label>
				url
				<input
				type="text"
				value={url}
				onChange={({ target }) => setUrl(target.value)}
				/>
			</label>
		  </div>
  
		  <button type="submit">create</button>
		</form>
		
	  </div>
	  
	)
	
	
	
	
}

export default AddBlog