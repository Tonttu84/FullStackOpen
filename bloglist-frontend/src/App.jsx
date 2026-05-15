import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'


import User from './components/User'
import AddBlog from './components/AddBlog'
import Login from './components/Login'


const App = () => {
  const [blogs, setBlogs] = useState([])
 
  const [user, setUser] = useState(null)


  const handleLogout = () => {

  setUser(null)
  blogService.setToken(null)

  localStorage.removeItem('loggedBlogUser')


}


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




const deleteBlog = async (blog) => {
	console.log('BLOG ID at deleteBlog:', blog.id)
	
	try {
	  await blogService.deleteBlog(blog)
  
	  setBlogs(blogs.filter(b => b.id !== blog.id))
	} catch (error) {
	  console.error('delete failed', error)
	}
  }

const refreshBlogs = async () => {
	const blogs = await blogService.getAll()
	setBlogs(blogs)
  }

  useEffect(() => {
    refreshBlogs()
  }, [])

  const handleLike = async (blog) => {
	console.log(blog)
	console.log(blog.id)

	const updatedBlog = {
		...blog,
		likes: (blog.likes || 0) + 1
	  }

	  delete updatedBlog.user

	  const returnedBlog = await blogService.like(updatedBlog)

	setBlogs(prev =>
  prev.map(b =>
    b.id === blog.id
      ? returnedBlog
      : b
	)
	)
  }
  
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (!user) {
    
    return (
      <div>
        <h2>Log in to application</h2>

      
      
		<Login setUser={setUser} />
        
      </div>

    )
  }

  return (
    <div>
      <h2>blogs</h2>

     <User user={user} handleLogout={handleLogout} />
     <p/>
	 <AddBlog addtoBackend={addtoBackend} />

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App