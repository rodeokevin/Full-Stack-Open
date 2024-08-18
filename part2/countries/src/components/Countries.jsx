import { useState, useEffect } from 'react'
import countriesService from '../services/countries'
import Weather from './Weather'

const Countries = ({filteredCountries}) => {

    const [content, setContent]  = useState(null)
    const [weather, setWeather] = useState(null)
    const getLanguages = languages => Object.values(languages)

    
    // Content for when displaying the information of a country
    const countryContent = (country, lat, lon) => {
        
        setContent(            
        <div>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital}</div>
            <div>area: {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {getLanguages(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} />
            <Weather country={country} lat={lat} lon={lon} />
        </div>)
    }
    // Consumes the string of a country and returns the information for that country
    const displayCountry = (country) => {
        return (
            countriesService
                .getCountry(country)
                .then(response => {countryContent(response, response.capitalInfo.latlng[0], response.capitalInfo.latlng[1])})
        )
    }

    // If only 1 country matches, we fetch the data for that country
    useEffect(() => {
        if (filteredCountries.length == 1) {
            const country = filteredCountries[0]
            displayCountry(country)}
        else {
            setContent(<div>{filteredCountries.map(country => 
                <div key={country}>
                    {country} 
                    <button onClick={() => displayCountry(country)}>show</button>
                </div>)}
            </div>)
        }
    }, [filteredCountries])
    
    
    return (
        <>{content}</>
    )
}

export default Countries