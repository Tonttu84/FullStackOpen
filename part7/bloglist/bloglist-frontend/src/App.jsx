import { useState, useEffect } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import Blogs from './components/Blogs'
import BlogPage from './components/BlogPage'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import PageNotFound from './components/PageNotFound'

import { useBlogs } from './stores/blogStore'



import { NavLink, Navbar, LogoutButton, Spacer } from './styles/components'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'

const AppContent = () => {
  

 
  
  const { blogs,  initializeBlogs } = useBlogs()

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    localStorage.removeItem('loggedBlogUser')

    navigate('/')
  }


  useEffect(() => {
  initializeBlogs()
}, [])
  

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)


  console.log(blogs)

  return (
    <>
      <Navbar>
        <NavLink to="/">Blog App</NavLink>

        <Spacer />

        <NavLink to="/">blogs</NavLink>
        {!user && <NavLink to="/login">login</NavLink>}
        {user && <NavLink to="/create">new blog</NavLink>}
        {user && <LogoutButton onClick={handleLogout}>logout</LogoutButton>}
      </Navbar>
      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/" element={<Blogs sortedBlogs={sortedBlogs} />} />

          <Route
            path="/blogs/:id"
            element={
              <BlogPage
                user={user}
              />
            }
          />

          <Route
            path="/create"
            element={
              <AddBlog
                
                
              />
            }
          />
        </Routes>
      </ErrorBoundary>
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
