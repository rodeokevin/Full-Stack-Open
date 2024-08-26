import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPersonObject => {
  const request = axios.post(baseUrl, newPersonObject)
  return (
    request
      .then(response => response.data)
      .catch(error => {throw error})
)}

const update = (id, newPersonObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObject)
  return (
    request
      .then(response => response.data)
      .catch(error => {throw error})
  )
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }