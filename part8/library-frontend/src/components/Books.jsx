import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
	const [filter, setFilter] = useState('')
	const { loading, error, data } = useQuery(ALL_BOOKS, {
		variables: { genre: filter || null }
	})
	const allBooksResult = useQuery(ALL_BOOKS)


  if (!props.show) {
    return null
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error: {error.message}</p>




  const genres = allBooksResult.data
    ? [...new Set(allBooksResult.data.allBooks.flatMap(b => b.genres))]
    : []

  return (
    <div>
      <h2>books</h2>
      {filter && <p>books in genre <b>{filter}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks            
            .map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => setFilter(g)}>{g}</button>
        ))}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
