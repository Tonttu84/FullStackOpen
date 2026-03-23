const Part = ({part}) =>
{
	return (
		<p> {part.name} {part.exercises} </p>
	)
}

const Header = ({ name }) => {
	return (
	  <h2>{name}</h2>
	)
  }
  function renderPart(part) {
	return <Part key={part.id} part={part} />;
  }

  const totalExercises = (course) => {
	return course.parts.reduce((sum, part) => {
	  return sum + part.exercises;
	}, 0);
  };
  
  export const Course = ({ course }) => {
	return (
	  <>
		<Header name={course.name} />
  
		{course.parts.map(renderPart)}
		<p>Total: {totalExercises(course)}</p>
	  </>
	);
  };

