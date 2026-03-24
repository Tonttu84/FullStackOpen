export const PersonForm = ({addPerson}) => {
	return(
	<>
	<form onSubmit={addPerson}>
		<div> 	name: <input name="name" />	  </div>
		<div>number: <input name="number" /></div>
		<div>	<button type="submit">add</button>    </div>
		</form>
	</>
	)
}
