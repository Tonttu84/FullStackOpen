const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}


export const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content,  votes: 0 }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create an anecdote')
  }
  
  return await response.json()
}

export const increaseVotebyID = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      votes: anecdote.votes + 1
    })
  })

  if (!response.ok) {
    throw new Error('Failed to update votes')
  }

  return await response.json()
}


export const deleteAnec = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }

  return await response.json()
};

