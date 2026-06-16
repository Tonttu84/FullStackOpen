import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from '../requests'
import { useNotify } from '../contexts/NotificationContext'

const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`anecdote '${newAnecdote.content}' created`)
      setTimeout(() => setNotification(null), 5000)
	},
	onError:(error) => {
	  setNotification(`anecdote creation failed: ${error.message}`)
	  setTimeout(() => setNotification(null), 5000)	
	}
    
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`anecdote '${updatedAnecdote.content}' voted`)
      setTimeout(() => setNotification(null), 5000)
    }
  })

  return {
    result,
    createAnecdote: newAnecdoteMutation.mutate,
    voteAnecdote: voteAnecdoteMutation.mutate
  }
}

export default useAnecdotes
