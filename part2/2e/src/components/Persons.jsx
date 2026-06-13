


export const Persons = ({ person, filterWord, removePerson  }) => {
	if (!person.name.toLowerCase().includes(filterWord.toLowerCase())) return null;
	return (
    <div>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)}>
        delete
      </button>
    </div>
  )
  };