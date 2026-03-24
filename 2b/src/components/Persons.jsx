export const Persons = ({ person, filterWord }) => {
	if (!person.name.toLowerCase().includes(filterWord.toLowerCase())) return null;
	return <p>{person.name} {person.number}</p>;
  };