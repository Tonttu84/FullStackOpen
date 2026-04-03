export const Filter = ({filterWord, handleFilterChange}) =>
{
	return(
	<>
	<form>
	  {console.log(filterWord)}
		<div>
 	 	filter shown with{" "}
  		<input name="filter" onChange={handleFilterChange} />
		</div>
	  </form>
	</>
	)
}