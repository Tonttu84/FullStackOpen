import.meta.env.VITE_API_URL
import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}
const getInfo = () => {
	return axios.get(baseUrl + '/info').then(response => response.data)
  }

  const getPerson = (id) => {
	return axios.get(`${baseUrl}/${id}`).then(response => response.data)
  }

const create = (personObject) => {
  return axios.post(baseUrl, personObject).then(response => response.data)
}

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, getInfo, getPerson, create, update, remove }