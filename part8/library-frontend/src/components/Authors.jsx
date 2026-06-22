import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_WRITER } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_WRITER, {
	refetchQueries: [{ query: ALL_AUTHORS }],
	onError: (error) => console.error(error.message)
  })
  
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        name: author,
        setBornTo: parseInt(born)
      }
    })
    setAuthor('')
    setBorn('')
  }

  useEffect(() => {
    if (data?.allAuthors?.length > 0 && author === '') {
      setAuthor(data.allAuthors[0].name)
    }
  }, [data])

  if (!props.show) {
    return null
  }

  if (loading) return <p>loading...</p>
  if (error) return <p>error: {error.message}</p>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
	  {localStorage.getItem('library-user-token') && (
		<>
		  <h3>Set birthyear</h3>
		  <form onSubmit={handleSubmit}>
			<div>
			  name
			  <select name="name" value={author} onChange={({ target }) => setAuthor(target.value)}>
				{data.allAuthors.map((a) => (
				  <option key={a.id} value={a.name}>{a.name}</option>
				))}
			  </select>
			</div>
			<div>
			  <label>born
			  <input
				type="number"
				value={born}
				onChange={({ target }) => setBorn(target.value)}
			  /></label>
			</div>
			<button type="submit">update author</button>
		  </form>
		</>
	  )}
	</div>
  )
}

export default Authors
