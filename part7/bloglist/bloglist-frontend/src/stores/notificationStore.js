import { create } from 'zustand'

export const useNotification = create((set) => ({
  notification: null,

  setNotification: (notification) => {
  set({ notification })

  setTimeout(() => {
    set({ notification: null })
  }, 5000)
},
}))