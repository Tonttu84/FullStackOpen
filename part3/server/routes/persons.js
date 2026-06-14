import express from 'express'
import Person from '../models/person.js'

const router = express.Router()

router.get('/', (req, res, next) => {
Person.find({}).then(persons => res.json(persons))
  .catch(error => next(error))
})

router.get('/info', (req, res, next) => {
	Person.countDocuments({
		name: { $exists: true },
		number: { $exists: true }
	  })
	  .then(count => {
		res.send(`Phonebook has info for ${count} people`)
	  })
	  .catch(error => next(error))
  })

router.get('/:id', async (req, res, next) => {
	try {
	  const person = await Person.findById(req.params.id)
  
	  if (person) {
		res.json(person)
	  } else {
		res.status(404).end()
	  }
	} catch (error) {
	  next(error)
	}
  })



router.post('/', async (req, res, next) => {
	try {
	  if (!req.body.name || !req.body.number) {
		return res.status(400).json({ error: 'name or number missing' })
	  }
  
	  
  
	  const person = new Person(req.body)
	  const saved = await person.save()
  
	  res.json(saved)
  
	} catch (error) {
	  next(error)
	}
  })


  router.put('/:id', async (req, res, next) => {
	try {
	  const existingPerson = await Person.findById(req.params.id)
  
	  if (!existingPerson) {
		return res.status(404).end()
	  }
  
	  if (req.body.name && existingPerson.name !== req.body.name) {
		console.warn(
		  `Name change detected: "${existingPerson.name}" → "${req.body.name}"`
		)
	  }
  
	  const updatedPerson = await Person.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
		  new: true,
		  runValidators: true,
		  context: 'query'
		}
	  )
  
	  res.json(updatedPerson)
	} catch (error) {
	  next(error)
	}
  })


router.delete('/:id', (req, res, next) => {
	const id = req.params.id
  
	Person.findByIdAndDelete(id)
	  .then(result => {
		if (!result) {
		  return res.status(404).json({ error: 'person not found' })
		}
		console.log('Deleted:', result.name)
		res.status(200).json({ message: 'deleted successfully' })
	  })
	  .catch(error => next(error))
  })

export default router