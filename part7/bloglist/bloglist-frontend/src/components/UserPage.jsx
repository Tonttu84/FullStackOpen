import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAll as getUsers } from '../services/user'
import { useBlogs } from '../stores/blogStore'
import { BlogList } from '../styles/components'

const UserPage = () => {
  const { id } = useParams()

  const [users, setUsers] = useState([])
  const { blogs } = useBlogs()

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const user = users.find(u => u.id === id)

  if (!user) return <div>Loading...</div>

  const filteredBlogs = blogs.filter(
    b => b.user?.id === user.id
  )

  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>

      <BlogList>
        {filteredBlogs.map(blog => (
          <div key={blog.id}>
            {blog.title} by {blog.author}
          </div>
        ))}
      </BlogList>
    </>
  )
}

export default UserPage