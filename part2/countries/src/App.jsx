import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countriesService from './services/countries'


const App = () => {

  const [countries, setCountries] = useState([])
  useEffect(() => {
    countriesService
    .getAll()
    .then(countries => setCountries(countries.sort()))
  }, [])

  const [newFilter, setNewFilter] = useState('')
  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
  }

  const filteredCountries = newFilter ? 
                            countries.filter(country => country.toLowerCase().includes(newFilter.toLowerCase())) : 
                            [] 
  
  return (
    <>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      {filteredCountries.length <= 10 ? <Countries filteredCountries={filteredCountries}/> : "Too many matches, specify another filter"}
    </>
  )
}

export default App
