import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const booksResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  if (!props.show) return null
  if (booksResult.loading || meResult.loading) return <p>loading...</p>
  if (booksResult.error || meResult.error) return <p>error</p>

  const user = meResult.data.me
  if (!user?.favoriteGenre) return (
    <div>
      <h2>recommendations</h2>
      <p>no favorite genre set</p>
    </div>
  )

  const favorites = booksResult.data.allBooks.filter(b => b.genres.includes(user.favoriteGenre))

  if (favorites.length === 0) return (
    <div>
      <h2>recommendations</h2>
      <p>no books in your favorite genre</p>
    </div>
  )

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favorites.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
