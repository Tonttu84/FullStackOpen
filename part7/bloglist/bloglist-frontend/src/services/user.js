import axios from 'axios'

const baseUrl = '/api/users'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}
