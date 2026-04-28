import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'

const Login = ({setUser}) =>
{

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [errorMessage, setErrorMessage] = useState(null)

	const handleLogin = async (event) => {
		event.preventDefault()
	   try {
		const response = await loginService.login({username, password})
		
	
		setUser(response) 
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

	return(
	<>
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
	
	</>
	)
}
export default Login