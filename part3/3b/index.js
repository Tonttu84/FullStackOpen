const express = require('express')
const app = express()

const morgan = require('morgan')

app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(express.static('dist'))


const generateId = () => {
  let id
  do {
    id = Math.floor(Math.random() * 1000000).toString()
  } while (data.find(p => p.id === id))
  return id
}

let data = [
  
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }

]
app.get('/api/persons', (request, response) => {
  response.json(data)
  


})



app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const nameExists = data.find(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  data.push(newPerson)

  response.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
  data = data.filter(p => p.id !== id)
  
    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
  const person = data.find(p => p.id === id)
  
    if (person) {
    response.json(person)
    } else {
    response.status(404).json({ error: 'Person not found' })
    }
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>
  `)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})