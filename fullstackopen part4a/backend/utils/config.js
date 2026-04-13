require('dotenv').config({ path: './backend/.env' })
const logger = require('./logger')

const mongoUrl = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.VAR_MONGO_URL

if(!process.env.TEST_MONGODB_URI || !process.env.VAR_MONGO_URL)
{
	logger.info("env file is invalid")
}

const PORT = process.env.VAR_PORT || 3001

module.exports = { mongoUrl, PORT }