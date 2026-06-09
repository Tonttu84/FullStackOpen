import { useField } from '../hooks/useField'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { Button, Input, HiddenLabel } from '../styles/components'
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

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <HiddenLabel htmlFor="username">username</HiddenLabel>
          <Input id="username" placeholder="username" {...username} />
        </div>
        <div>
          <HiddenLabel htmlFor="password">password</HiddenLabel>
          <Input id="password" placeholder="password" {...password} />
        </div>
        <Button type="submit">login</Button>
      </form>
    </>
  )
}
export default Login
