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
		<button type="button" onClick={() => setShowAdd(false)}>
		cancel
		</button>
	  </div>
	  
	)
	}
	
	return (
		<button  type="button" onClick={() => setShowAdd(true)}>
		create new blog
		</button>
	)
	
}

export default AddBlog