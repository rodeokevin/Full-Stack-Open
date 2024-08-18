import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

// obtain weather response from openweather
const weather = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return request.then(response => response)
}

export default { weather }

