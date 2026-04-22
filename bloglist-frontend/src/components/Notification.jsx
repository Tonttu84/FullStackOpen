
const Notification = ({ notification }) => {

console.log(`notification is ${notification}`)

  if (!notification) return null

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}



export default Notification