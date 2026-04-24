import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import User from './components/User'
import AddBlog from './components/AddBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogout = () => {


  setUser(null)


  blogService.setToken(null)
 

  localStorage.removeItem('loggedBlogUser')
  setUsername('')
  setPassword('')

}

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
   try {
    const response = await loginService.login({username, password})
    console.log(response)

    setUser(response) // or response.user or whatever you return
    localStorage.setItem('loggedBlogUser', JSON.stringify(response));
    blogService.setToken(response.token)
  } catch (error) {
    console.error('login failed', error)

    setErrorMessage({
  type: 'error',
  message: 'Invalid username or password'
})
    setTimeout(() => setErrorMessage(null), 5000)
    setUser(null)
  }
    
  }
  
  

  if (!user) {
    
    return (
      <div>
        <h2>Log in to application</h2>

      
      <Notification notification={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
              type = 'text'
              value={username}
              onChange={({target}) => setUsername(target.value)}
              />
            </label>
            </div>
            <div>
              <label>
                password
                <input
                type = "password"
                value = {password}
                onChange={({target}) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type="submit">login</button>
          </form>
      </div>

    )
  }

  return (
    <div>
      <h2>blogs</h2>

     <User user={user} handleLogout={handleLogout} />
     <p/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App