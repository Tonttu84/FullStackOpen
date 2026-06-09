
import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const userStore = create((set) => ({
  user: null,

  login: async (credentials) => {
    const user = await loginService.login(credentials)

    blogService.setToken(user.token)

    set({ user })

    return user
  },

  logout: () => {
    blogService.setToken(null)
    set({ user: null })
  },
}))