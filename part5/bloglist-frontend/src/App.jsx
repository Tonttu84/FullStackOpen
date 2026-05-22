import Blogs from './components/Blogs'
import Login from './components/Login'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


const App = () =>
{
      const [user, setUser] = useState(null)
        const padding = {
    padding: 5
  }


    return (
        <>
          
          <Router>
      <div>
        
        <Link style={padding} to="/login">login</Link>
        <Link style={padding} to="/">blogs</Link>
        
      </div>

      <Routes>
        <Route path="/login" element={
          <Login setUser={setUser} />
        } />
        <Route path="/" element={
          <Blogs user={user} setUser={setUser}/>
        } />
        
        
      </Routes>
    </Router>
    
         
         
        
        </>
    )
}

export default App






