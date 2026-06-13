export const Filter = ({filterWord, handleFilterChange}) =>
{
	return(
	<>
	<form>
	  {console.log(filterWord)}
		<div>
 	 	find countries{" "}
  		<input name="filter" onChange={handleFilterChange} />
		</div>
	  </form>
	</>
	)
}