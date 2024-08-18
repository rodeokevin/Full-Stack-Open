import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Success from './components/Success'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const [newFilter, setNewFilter] = useState('')
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  // Add or update a person
  const handleSubmit = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    // Find the id of the person we're trying to add
    const findId = (name) => {
      const found = persons.find(person => person.name === name)
      return found ? found.id : null
    }

    const foundId = findId(newName)

    // Update a person
    if (foundId) {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        personService
          .update(foundId, newPersonObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson ))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${newName}'s number to ${newNumber}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)})
          .catch(() => {
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Information of ${newName} has already been removed from the server`),
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)})
      }
    }
    // Add a person
    else {
      personService
        .create(newPersonObject)
        .then(updatedPersons => setPersons(persons.concat(updatedPersons)))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Added ${newName} to phonebook`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Success message={successMessage} />
      <Error message={errorMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} persons={persons} 
               setPersons={setPersons} setSuccessMessage={setSuccessMessage} />

    </div>
  )
}

export default App