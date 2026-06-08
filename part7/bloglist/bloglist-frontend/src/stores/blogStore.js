import { create } from 'zustand'
import blogService from '../services/blogs'
import { useNotification } from './notificationStore'

export const useBlogs = create((set) => ({
  blogs: [],

  initializeBlogs: async () => {
  try {
    const blogs = await blogService.getAll()
    set({ blogs })
  } catch (error) {
    useNotification
      .getState()
      .setNotification(error.response?.data?.error || error.message)
  }
},

  addBlog: async (blog) => {
    try {
      const newBlog = await blogService.create(blog)

      set((state) => ({
        blogs: [...state.blogs, newBlog],
      }))

      useNotification.setNotification({
        type: 'success',
        message: `${newBlog.title || 'Unknown title'} by ${newBlog.author || 'Unknown author'} added`,
      })
    } catch (error) {
      void error
      useNotification.setNotification({
        type: 'error',
        message: 'Failed to add blog',
      })
    }
  },

  deleteBlog: async (blog) => {
    try {
      await blogService.deleteBlog(blog)

      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== blog.id),
      }))
    } catch (error) {
      useNotification
        .getState()
        .setNotification(error.response?.data?.error || error.message)
    }
  },

  addLike: async (blog) => {
  try {
    const updatedBlog = await blogService.like(blog)

    set((state) => ({
      blogs: state.blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      ),
    }))
  } catch (error) {
    useNotification
      .getState()
      .setNotification(error.response?.data?.error || error.message)
  }
},
}))