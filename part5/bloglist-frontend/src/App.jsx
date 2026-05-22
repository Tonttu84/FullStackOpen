import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'


const AppContent = () =>
{
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


    return (
        <>
          
          
      <div>

        <Link style={padding} to="/">blogs</Link>
        {!user && 
        (<Link style={padding} to="/login">login</Link>)}
        {user && (<button onClick={handleLogout}>logout</button>)}
        
        
      </div>

      <Routes>
        <Route path="/login" element={
          <Login setUser={setUser} />
        } />
        <Route path="/" element={
          <Blogs user={user} />
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






