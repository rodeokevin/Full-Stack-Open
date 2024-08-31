import axios from 'axios'
const baseUrl = 'api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data).catch(error => {throw error})
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data).catch(error => {throw error})
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  axios.delete(`${baseUrl}/${id}`, config).catch(error => { throw error })
}

export default { getAll, create, update, remove, setToken }