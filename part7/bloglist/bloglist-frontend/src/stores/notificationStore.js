import { create } from 'zustand'

export const useNotification = create((set) => ({
  notification: null,

  setNotification: (message, type) => {
    set({ notification: { message, type } })

    setTimeout(() => {
      set({ notification: null })
    }, 5000)
  },
}))