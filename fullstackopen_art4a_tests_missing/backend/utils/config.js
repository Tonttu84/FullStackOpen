const result = require('dotenv').config()

if (result.error) {
  console.log('⚠️ .env file not found or failed to load')
} else {
  console.log('✅ .env loaded')
}

const PORT = process.env.PORT || 3001
const mongoUrl = process.env.MONGODB_URI

module.exports = { PORT, mongoUrl }