import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/client/react'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : null }
  }
})

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000' })),
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
	<ApolloProvider client={client}>
   	 <App />
	</ApolloProvider>
  </StrictMode>
)
