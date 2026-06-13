import  useAnecdoteStore  from '../stores/store'
import useNotification from '../stores/notification'

const AnecdoteForm = () =>
{

   
    const actions = useAnecdoteStore((state) => state.actions);
    const setNotification = useNotification(
    (state) => state.setNotification
  );

    const addAnecdote = (event) =>
    {
        event.preventDefault()
        const content = event.target.input.value.trim()
        if (content)
        {
            actions.addAnecdote(content)
            setNotification(`You added ${content}`, "success");
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

