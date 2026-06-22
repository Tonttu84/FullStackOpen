import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN   } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [loginUser] = useMutation(LOGIN, {
		onError: (err) => setError('login failed: ' + err.message)
  })

  if (!props.show) {
	return null
  }

  const submit = async (event) => {
	event.preventDefault()

	const result = await loginUser({ variables: { username, password } })
	if (result.data) {
	  const token = result.data.login.value
	  localStorage.setItem('library-user-token', token)
	  props.setToken(token)
	}

	setUsername('')
	setPassword('')
  }


  return (
	<div>
	  {error && <p style={{ color: 'red' }}>{error}</p>}
	  <form onSubmit={submit}>
		<div>
		  <label>username
		  <input
			value={username}
			onChange={({ target }) => setUsername(target.value)}
		  /></label>
		</div>
		<div>
		  <label>password
		  <input
			value={password}
			onChange={({ target }) => setPassword(target.value)}
		  /></label>
		</div>
		<button type="submit">login</button>
	  </form>
	</div>
  )
}

export default Login
