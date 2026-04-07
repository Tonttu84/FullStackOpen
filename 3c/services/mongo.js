const mongoose = require('mongoose')

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('Usage:')
  console.log('node script.js <password>')
  console.log('node script.js <password> <name> <number>')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const password = process.argv[2]
const url = `mongodb+srv://tonttutorvinen22_db_user:${password}@fullstackopendb.pjj6fn6.mongodb.net/?appName=fullstackopendb`

const Person = mongoose.model('Person', personSchema)

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })



const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length === 3) {
  Person.find({})
  .then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
  })
  .catch(error => {
    console.log('error accessing database:', error.message)
  })
  .finally(() => {
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const person = new Person({ name, number })

  person.save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
    })
    .catch(error => {
      console.log('error saving person:', error.message)
    })
  .finally(() => {
    mongoose.connection.close()
  })
}









