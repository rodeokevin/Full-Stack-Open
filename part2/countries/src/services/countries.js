import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

// Get all the common names of the countries
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data.map(country => country.name.common))
}

const getCountry = (country) => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    return request.then(response => response.data)
}

export default { getAll, getCountry }

