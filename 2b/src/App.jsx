import { useState } from 'react'

const Person = ({ name }) => {
	return <p>{name}</p>;
  };

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  

  const addPerson = (event) => {
	event.preventDefault(); // prevents page reload
	console.log(structuredClone(event.target.elements.name.value));
	const NewName = event.target.elements.name.value;
	const newPerson = {
		name: NewName
	  };
	if (!NewName)
	{
		alert('Name is empty');
		return; 
	}
	if(persons.find(person => person.name === NewName))
	{
		alert(`${NewName} is already added`)
	}
	console.log(NewName +" added");
	setPersons(persons.concat(newPerson));
	

  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
	  <div>
    	name: <input name="name" />
 	 </div>
        <div>
		<button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
 	 <Person key={person.name} name={person.name} />
	))}
    </div>
  )
}

export default App