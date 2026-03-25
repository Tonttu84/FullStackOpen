import { useState } from 'react'
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
	number: '222122' }
  ]) 
  
  const [filterWord, setFilterWord] = useState("");

  const handleFilterChange = (event) => {
	setFilterWord(event.target.value);
  };

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
	if(persons.find(person => person.name === NewName))
	{
		alert(`${NewName} is already added`)
		return;
	}
	console.log(NewName +" added");
	setPersons(persons.concat(newPerson));
	

  };


  return (
    <div>
      <h1>Phonebook</h1>
	  <Filter filterWord={filterWord} handleFilterChange={handleFilterChange}  />
	  <h1>add a new</h1> 
      <PersonForm addPerson={addPerson}/>
      <h1>Numbers</h1>
      {persons.map(person => (
 	 <Persons key={person.name} person={person} filterWord={filterWord}  />
	))}
    </div>
  )
}

export default App