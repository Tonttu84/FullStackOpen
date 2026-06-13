import useNotification from '../stores/notification'

const Notification = () => {

  const notification = useNotification((state) => state.notification);
 // const type = useNotification((state) => state.type);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  if (notification)
    return <div style={style}>{notification}</div>;

  return null
}

export default Notification