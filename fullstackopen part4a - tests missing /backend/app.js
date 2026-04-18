const { mongoUrl, PORT } = require('./utils/config.js')
const mongoose = require('mongoose')
const express = require('express')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const middleware = require('./middleware/middleware.js')
const blogRouter = require('./modules/blogs/blog.controller.js')
const userRouter = require('./modules/users/user.controller.js')

const {tokenExtractor} = require('./middleware/auth.js')



const app = express()


logger.info('connecting to', config.mongoUrl)


mongoose
	.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })



  app.use(express.static('dist'))
  app.use(express.json())
  app.use(middleware.requestLogger)

  app.use('/api/blogs', tokenExtractor, blogRouter)
  app.use('/api/users', userRouter)

  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

module.exports = app


