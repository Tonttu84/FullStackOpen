import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
	reset
  }
}

export const useAnecdotes = () => {
	const [anecdotes, setAnecdotes] = useState([])
  
	useEffect(() => {
	  const fetchAnecdotes = async () => {
		try {
		  const data = await anecdoteService.getAll()
		  setAnecdotes(data)
		} catch (error) {
		  console.error('Failed to fetch anecdotes:', error)
		}
	  }
  
	  fetchAnecdotes()
	}, [])
  
	const addAnecdote = async (anecdote) => {
	  try {
		const created = await anecdoteService.createNew(anecdote)
		setAnecdotes(prev => prev.concat(created))
	  } catch (error) {
		console.error('Failed to create anecdote:', error)
	  }
	}

	const removeAnecdote = async (anecdote) => {
		try {
		  await anecdoteService.deleteAnecdote(anecdote.id)
	  
		  setAnecdotes(prev =>
			prev.filter(a => a.id !== anecdote.id)
		  )
		} catch (error) {
		  console.error('Failed to delete anecdote:', error)
		}
	  }
  
	return { anecdotes, addAnecdote, removeAnecdote }
  }