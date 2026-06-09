import { useEffect } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import Blogs from './components/Blogs'
import BlogPage from './components/BlogPage'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Users from './components/Users'

import PageNotFound from './components/PageNotFound'

import { useBlogs } from './stores/blogStore'
import { userStore } from './stores/userStore'

import UserPage from './components/UserPage'

import { NavLink, Navbar, LogoutButton, Spacer } from './styles/components'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'

const AppContent = () => {
  const { blogs, initializeBlogs } = useBlogs()

  const { user, logout, initUser } = userStore()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/')
  }

  const createBlog = () => {}

  useEffect(() => {
    initUser()
  }, [initUser])

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  // console.log(blogs)
  // console.dir(user)

  return (
    <>
      <Navbar>
        <NavLink to="/">Blog App</NavLink>

        <Spacer />

        <NavLink to="/">blogs</NavLink>
        <NavLink to="/users">users</NavLink>
        {!user && <NavLink to="/login">login</NavLink>}
        {user && <NavLink to="/create">new blog</NavLink>}
        {user && <LogoutButton onClick={handleLogout}>logout</LogoutButton>}
      </Navbar>
      <ErrorBoundary>
        <Notification />

        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Blogs sortedBlogs={sortedBlogs} />} />
          <Route path="/users" element={<Users />} />

          <Route path="/users/:id" element={<UserPage />} />

          <Route path="/create" element={<AddBlog createBlog={createBlog} />} />
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
