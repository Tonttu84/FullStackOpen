import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { saveUser, removeUser, getUser } from '../services/persistentUser'

export const userStore = create((set) => ({
  user: null,

  setUser: (user) => {
    blogService.setToken(user.token)
    saveUser(user)
    set({ user })
  },

  login: async (credentials) => {
    const user = await loginService.login(credentials)

    blogService.setToken(user.token)
    saveUser(user)

    set({ user })

    return user
  },

  logout: () => {
    blogService.setToken(null)
    removeUser()
    set({ user: null })
  },

  initUser: () => {
    const user = getUser()

    if (user) {
      blogService.setToken(user.token)
      set({ user })
    }
  },
}))
