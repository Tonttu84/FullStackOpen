import { useEffect, useState } from 'react'
import { getAll as getUsers } from '../services/user'
import { UsersHeader, UserRow, AppLink } from '../styles/components'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    <div>
      <h1 style={{ margin: '2rem' }}>Users</h1>

      <UsersHeader>
        <div>Name</div>
        <div>Username</div>
        <div>Blogs</div>
      </UsersHeader>

      {users.map((user) => (
        <UserRow key={user.id}>
          <AppLink to={`/users/${user.id}`}>{user.name}</AppLink>

          <div>{user.username}</div>
          <div>{user.blogs.length}</div>
        </UserRow>
      ))}
    </div>
  )
}

export default Users
