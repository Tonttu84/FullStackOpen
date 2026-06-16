import  useAnecdoteStore  from '../stores/store'


const AnecdoteList = () =>
{
  const  increaseVotes  = useAnecdoteStore((state) => state.actions.increaseVotes);
   const anecdotes = useAnecdoteStore((state) => state.anecdotes);
   const filter = useAnecdoteStore((state) => state.filter);
   const  deleteAnecdote  = useAnecdoteStore((state) => state.actions.deleteAnecdote);

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
            <button onClick={() => increaseVotes(anecdote)}>vote</button>
            {!anecdote.votes &&
            <button onClick={() => deleteAnecdote(anecdote)}>delete</button>
            } 
          </div>
        </div>
      ))}
    </>
  )

}

export default AnecdoteList