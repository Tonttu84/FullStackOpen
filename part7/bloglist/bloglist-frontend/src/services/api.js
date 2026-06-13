// services/api.js I started adding a little notification for AI to help debugging

import axios from 'axios'

const api = axios.create()

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.error === 'token expired'
    ) {
      localStorage.removeItem('loggedBlogAppUser')

      alert('Session expired. Please log in again.')

      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default api