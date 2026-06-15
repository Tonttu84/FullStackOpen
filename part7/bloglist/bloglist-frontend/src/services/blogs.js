import api from './api'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = api.get(baseUrl)
  return request.then((response) => response.data)
}

const getBlog = (id) => {
  const request = api.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await api.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  }

  const response = await api.put(`${baseUrl}/${blog.id}`, updatedBlog, config)

  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await api.delete(`${baseUrl}/${blog.id}`, config)

  return response.data
}

const addComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await api.post(
    `${baseUrl}/${blog.id}/comments`,
    { comment },
    config,
  )

  return response.data
}

export default {
  getAll,
  getBlog,
  create,
  setToken,
  like,
  deleteBlog,
  addComment,
}
