require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.error('error connecting to MongoDB:', err.message))

  const getUserFromAuthHeader = async (auth) => {
	if (!auth || !auth.startsWith('Bearer ')) {
	  return null
	}
	if (!process.env.JWT_SECRET) {
	  throw new Error('JWT_SECRET is not defined in environment variables')
	}
   
	const decodedToken = jwt.verify(auth.substring('Bearer '.length), process.env.JWT_SECRET)
	return User.findById(decodedToken.id)
  }


const server = new ApolloServer({ typeDefs, resolvers })

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req }) => {
	const auth = req.headers.authorization
	const currentUser = await getUserFromAuthHeader(auth)
	return { currentUser }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
