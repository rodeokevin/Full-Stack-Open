import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const guestLogin = async () => {
  const guestObject = {
    username: 'guest',
    password: 'guest'
  }
  const response = await axios.post(baseUrl, guestObject)
  return response.data
}

export default { login, guestLogin }