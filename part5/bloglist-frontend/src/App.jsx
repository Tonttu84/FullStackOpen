import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogPage from './components/BlogPage'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'


import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'


const AppContent = () =>
{
    const [blogs, setBlogs] = useState([])

    const [notificationMessage, setNotificationMessage] = useState(null)

    const [user, setUser] = useState(null)
        const padding = {
    padding: 5
  }
  const navigate = useNavigate()

    const handleLogout = () => {
  
    setUser(null)
    blogService.setToken(null)
    localStorage.removeItem('loggedBlogUser')
  
    navigate('/')
  
    }

    

    const createBlog = async (newBlog) => {
            try {
              const createdBlog = await blogService.create(newBlog)
        
              await refreshBlogs()
        
              //console.log('Created blog:', createdBlog)
    
              setNotificationMessage({
                type: 'success',
                message: `${createdBlog.title || 'Unknown title'} by ${createdBlog.author || 'Unknown author'} added`
              })
              //console.log('Notification set to :', notificationMessage)
              setTimeout(() => setNotificationMessage(null), 5000)
    
        
            } catch (error) {
              //console.error('Error creating blog:', error)
              void error
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

    return (
        <>
          
          
      <div>

        <Link style={padding} to="/">blogs</Link>
        {!user && 
        (<Link style={padding} to="/login">login</Link>)}
        {user && (<Link style={padding} to="/create">new blog</Link>)}
        {user && (<button onClick={handleLogout}>logout</button>)}
        
        
        
      </div>

      <Routes>
        <Route path="/login" element={
          <Login setUser={setUser} />
        } />
        <Route path="/" element={
          <Blogs sortedBlogs={sortedBlogs} />
        } />

        <Route
        path="/blogs/:id"
        element={
            <BlogPage
            blogs={blogs}
            deleteBlog={deleteBlog}
            handleLike={handleLike}
            user={user}
            />
        }
        />

        <Route path="/create" element={
             <AddBlog createBlog={createBlog} 
	 	notifMessage={notificationMessage} />
        } />
	 

        
        
      </Routes>
   
    
         
         
        
        </>
    )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App






