import weatherService from '../services/weather'
import { useState, useEffect } from 'react'

const Weather = ({country, lat, lon}) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
            .weather(lat, lon)
            .then(response => setWeather(response.data))

    }, [lat, lon])

    return (
        <>
            <h2>Weather in {country.capital}</h2>
            <div>temperature: {weather ? (weather.main.temp -273.15).toFixed(2) : ''} Celcius</div>
            <div>wind: {weather ? weather.wind.speed : ''} m/s</div>
        </>
    )
}

export default Weather