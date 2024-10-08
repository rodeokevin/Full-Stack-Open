import axios from 'axios'
const baseUrl = '/api/users'

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data).catch(error => {throw error})
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { create, getAll }