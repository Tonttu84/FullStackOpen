import * as anecdoteService from './src/services/anecdotes'
import AnecdoteList from './src/components/AnecdoteList'
import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import useAnecdoteStore from './src/stores/store'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'


describe('For zustand anecdotes: ', () =>
{
	
	const anecdotes = [
		{ id: 1, content: 'first', votes: 1 },
		{ id: 2, content: 'second', votes: 10 },
		{ id: 3, content: 'third', votes: 5 }
	  ]

	  beforeEach(() => {
		useAnecdoteStore.setState({
		  anecdotes,
		  filter: ''
		})
	  })
	  afterEach(() => {
		cleanup()
	  })
	  

	  vi.mock('./src/services/anecdotes', () => ({
		getAll: vi.fn(),
		createNew: vi.fn(),
		increaseVotebyID: vi.fn(),
		deleteAnec: vi.fn()
	  }))

test('the state is initialized with the anecdotes returned by the backend', async () => {
	anecdoteService.getAll.mockResolvedValue(anecdotes)

	await useAnecdoteStore.getState().actions.fetchAnecdotes()
  
	expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
})

test('anecdotes are ordered from highest like to lowest likes', async () => {

	render(<AnecdoteList />)
	const items = screen.getAllByText(/first|second|third/)
	expect(items[0]).toHaveTextContent('second')
	expect(items[1]).toHaveTextContent('third')
	expect(items[2]).toHaveTextContent('first')

})

test('React component receives a properly filtered list of anecdotes.', async () => {

	render(<AnecdoteList />)
	expect(screen.getAllByText(/first|second|third/)).toHaveLength(3)
	useAnecdoteStore.getState().actions.setFilter('i')
	

		await waitFor(() => {
			const visible = screen.getAllByText(/first|second|third/)
		expect(visible.map(v => v.textContent)).toEqual([
			'third',
			'first'
		])

		})

	})
	test('voting increases votes for an anecdote', async () => {
		const user = userEvent.setup()

		anecdoteService.increaseVotebyID.mockResolvedValue({
			id: 2,
			content: 'second',
			votes: 11
		  })
	  
		render(<AnecdoteList />)
	  
		const voteButton = screen.getAllByText('vote')[1] 
	  
		await user.click(voteButton)
	  
		await waitFor(() => {
			const second = screen.getByText('second')
			expect(second.parentElement).toHaveTextContent('11')
		  })
	  })
})