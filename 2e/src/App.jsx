import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([
  ])
  
  const [notification, setNotification] = useState(null)
  
  const [filterWord, setFilterWord] = useState("");

  const showNotification = (message, type = "success") => {
  setNotification({ message, type })

  setTimeout(() => {
    setNotification(null)
  }, 5000)
	}

  const handleFilterChange = (event) => {
	setFilterWord(event.target.value);
  };

    useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => {
    console.log('promise fulfilled')
    setPersons(initialPersons)
  })
  }, []);

  const removePerson = (id) => {
		if (!window.confirm("Delete this person?"))
		{
			return
		}
	personService.remove(id).then(() => {
		showNotification("Delete was a success", "success")
		setPersons(prev => prev.filter(p => p.id !== id))
	})
	.catch(() => {
  	showNotification("Error deleting person", "error")
	})
	}

  const addPerson = (event) => {
	event.preventDefault(); // prevents page reload
	console.log(structuredClone(event.target.elements.name.value));
	const NewName = event.target.elements.name.value;
	const NewNumber = event.target.elements.number.value;
	const newPerson = {
		name: NewName,
		number: NewNumber
	  };
	if (!NewName)
	{
		alert('Name is empty');
		return; 
	}
	const existingPerson = persons.find(p => p.name === NewName)
	if(existingPerson)
	{
		const updatedPerson = {
		...existingPerson,
		number: NewNumber
		}
		if (existingPerson.number === NewNumber)
		{
			alert(`${NewName} is already added`)
			showNotification(`${NewName} is already added`, "error")
			return;
		}
		personService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
    	setPersons(prev => prev.map(p => p.id !== returnedPerson.id ? p : returnedPerson))})
		showNotification(`Modified ${NewName}`, "success")
		
		return;	
	}
	console.log(NewName +" added");
	personService.create(newPerson).then(response => {
      setPersons(prev => prev.concat(response))
    })
	showNotification(`Added ${NewName}`, "success")
	

  };


  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification notification={notification} />
	  <Filter filterWord={filterWord} handleFilterChange={handleFilterChange}  /> 
      <PersonForm addPerson={addPerson}/>
      <h2>Numbers</h2>
      {persons.map(person => (
 	 <Persons key={person.name} person={person} filterWord={filterWord}  removePerson={removePerson} />
	))}
    </div>
  )
}

export default App