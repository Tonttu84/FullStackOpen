
import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client/react'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  const client = useApolloClient()

  useEffect(() => {
    const saved = localStorage.getItem('library-user-token')
    if (saved) setToken(saved)
  }, [])

  useEffect(() => {
    if (token) setPage('authors')
  }, [token])

  const handleLogout = () => {
	setToken(null)
    localStorage.clear()
    client.resetStore()
	setPage('authors')
 }


  if (!token)
	return (
		<div>
		  <div>
			<button onClick={() => setPage('authors')}>authors</button>
			<button onClick={() => setPage('books')}>books</button>
			<button onClick={() => setPage('login')}>login</button>
		  </div>

		  <Authors show={page === 'authors'} />

		  <Books show={page === 'books'} />

		  <Login show={page === 'login'} setToken={setToken} />
		</div>
	  )
	

  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
		<button onClick={() => setPage('recommend')}>recommend</button>
		<button onClick={() => handleLogout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

	  <Recommend show={page === 'recommend'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
