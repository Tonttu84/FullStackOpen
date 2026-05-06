import { useAnecdotes, useAnecdoteActions, useFilter } from '../store'

const AnecdoteList = () =>
{
  const { increaseVotes } = useAnecdoteActions()
   const anecdotes = useAnecdotes()
   const filter = useFilter()

   const sortedAndFiltered = anecdotes
    .filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)

  return(
    <>
        {sortedAndFiltered.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => increaseVotes(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )

}

export default AnecdoteList