import { useField } from '../hooks/useField'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../styles/components'
import { useNotification } from '../stores/notificationStore'
import { userStore } from '../stores/userStore'

const Login = () => {
  const Navigate = useNavigate()
  const username = useField('text')
  const password = useField('password')

  const setNotification = useNotification((state) => state.setNotification)

  const { login } = userStore()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({
        username: username.value,
        password: password.value,
      })
      Navigate('/')
    } catch (error) {
      console.log('From catch')
      console.error('login failed', error)

      setNotification({
        type: 'error',
        message: 'Invalid username or password',
      })
    }
  }

  const { reset: _ru, ...usernameProps } = username
  const { reset: _rp, ...passwordProps } = password

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <Input
            aria-label="username"
            id="username"
            placeholder="username"
            {...usernameProps}
          />
        </div>
        <div>
          <Input
            aria-label="password"
            id="password"
            placeholder="password"
            {...passwordProps}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </>
  )
}
export default Login
