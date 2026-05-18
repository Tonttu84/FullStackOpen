import { useState } from 'react'
import Notification from './Notification'



const AddBlog = ({ createBlog, notifMessage }) =>  {

	

	const [showAdd, setShowAdd] = useState(false)


	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
	
		createBlog({
		  title,
		  author,
		  url
		})
	
		setTitle('')
		setAuthor('')
		setUrl('')
	  }
  

	if (showAdd == true)
	{
	return (
	  <div>

		<p></p>

		<h2>create new</h2>

		<Notification notification={notifMessage} />
  
		<form onSubmit={handleSubmit}>
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
		<button onClick={() => setShowAdd(false)}>
		cancel
		</button>
	  </div>
	  
	)
	}
	
	return (
		<button onClick={() => setShowAdd(true)}>
		create new blog
		</button>
	)
	
}

export default AddBlog