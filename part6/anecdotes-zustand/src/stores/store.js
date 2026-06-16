
import { create } from 'zustand'
import {getAll, createNew, increaseVotebyID, deleteAnec} from '../services/anecdotes'
import useNotification from './notification'



const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    fetchAnecdotes: async () => {
      try {
        const anecdotes = await getAll()
        set({ anecdotes })
      } catch (err) {
        console.error('Failed to fetch anecdotes:', err)
      }
    },

    increaseVotes: async (anecdote) => {

        try
        {
         const updatedAnecdote =  await increaseVotebyID(anecdote)
         set((state) => ({
        anecdotes: state.anecdotes.map(a =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        )
      }))
        useNotification.getState().setNotification(
        `You voted ${anecdote.content}`,
        "success"
        );
              
        }
        catch (err) {
          console.error('Failed to update anecdotes:', err)
        }
      
      },

    addAnecdote: async (text) => {
    try {
      const newAnecdote = await createNew(text)

      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote]
      }))
      } catch (err) {
        console.error('Failed to add anecdote:', err)
      }
    },

    setFilter: value => set(() => ({ filter: value })),

      deleteAnecdote: async (anecdote) => {

        try {
          await deleteAnec(anecdote)
          set((state) => ({
              anecdotes: state.anecdotes.filter(
                (a) => a.id !== anecdote.id
              ),
            }));
        }
        catch (err) {
        console.error('Failed to delete anecdote:', err)
      }
        

      }
    
  }
}))

useAnecdoteStore.getState().actions.fetchAnecdotes() //inits once

export default useAnecdoteStore;
