import personService from '../services/persons'

const Persons = ({personsToShow, persons, setPersons, setSuccessMessage}) => {

  // Removes the person
  const handleClick = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      setSuccessMessage(`Deleted ${person.name} from phonebook`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

    return (
      <div>
        {personsToShow.map(person => 
          <div key={person.id}>
            {person.name} {person.number} <button onClick={() => handleClick(person)}>delete</button> 
          </div>)}
      </div>
    )
  }

  export default Persons