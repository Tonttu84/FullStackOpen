import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import User from './components/User'
import AddBlog from './components/AddBlog'
import Login from './components/Login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleLogout = () => {

  setUser(null)
  blogService.setToken(null)
  localStorage.removeItem('loggedBlogUser')

 


	}

	const createBlog = async (newBlog) => {
		try {
		  const createdBlog = await blogService.create(newBlog)
	
		  await refreshBlogs()
	
		  console.log('Created blog:', createdBlog)

		  setNotificationMessage({
			type: 'success',
			message: `${createdBlog.title || 'Unknown title'} by ${createdBlog.author || 'Unknown author'} added`
		  })
		  console.log('Notification set to :', notificationMessage)
		  setTimeout(() => setNotificationMessage(null), 5000)

	
		} catch (error) {
		  console.error('Error creating blog:', error)
		  setNotificationMessage({
			type: 'error',
			message: 'Failed to add blog'
		  })
			  setTimeout(() => setNotificationMessage(null), 5000)
			
		}
	  }


const deleteBlog = async (blog) => {
	
	
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
	 <AddBlog createBlog={createBlog} 
	 	notifMessage={notificationMessage}
	 />

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App