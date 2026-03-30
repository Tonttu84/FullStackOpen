const Header = ({ course }) => {
  console.log(course)
  return <h1>{course}</h1>
}
const Total = ({ parts }) => {


  return <p>Total: {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
}

const Part = ({text ,  number }) => {
  return <p>{text} {number}</p>
}



const Content = ({parts})  => {



  return (
    <div>
      <Part text={parts[0].name} number = {parts[0].exercises}/>
      <Part text={parts[1].name} number = {parts[1].exercises}/>
      <Part text={parts[2].name} number = {parts[2].exercises}/>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App