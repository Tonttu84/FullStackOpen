import 'dotenv/config'
import app from './app.js'
import mongoose from 'mongoose'


const PORT = process.env.PORT
console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

    server.on('error', (error) => {
      console.error('Server failed to start:', error.message)
      process.exit(1)
    })
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
    process.exit(1)
  })