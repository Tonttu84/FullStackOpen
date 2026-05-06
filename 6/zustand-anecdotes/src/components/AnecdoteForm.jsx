import { useAnecdoteActions } from '../store'

const AnecdoteForm = () =>
{

    const actions = useAnecdoteActions()

    const addAnecdote = (event) =>
    {
        event.preventDefault()
        const content = event.target.input.value.trim()
        if (content)
        {
            actions.addAnecdote(content)
        }
        event.target.reset()
        
        
    }
  
  return(
    <>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="input" />
        </div>
        
        <button>create</button>
      </form>
    </>
  )

}

export default AnecdoteForm

