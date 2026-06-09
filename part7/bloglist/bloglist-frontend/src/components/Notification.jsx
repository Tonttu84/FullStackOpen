import { NotificationBox, NotificationIcon } from '../styles/components'
import { useNotification } from '../stores/notificationStore'

const Notification = () => {
  const notification = useNotification((state) => state.notification)

  // console.log("Notification render:", notification)

  if (!notification) return null

  return (
    <NotificationBox type={notification.type}>
      <NotificationIcon>
        {notification.type === 'error' ? '✖' : '✔'}
      </NotificationIcon>
      {notification.message}
    </NotificationBox>
  )
}

export default Notification
