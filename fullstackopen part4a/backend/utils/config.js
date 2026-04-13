require('dotenv').config()

const mongoUrl = process.env.VAR_MONGO_URL
const PORT = process.env.VAR_PORT || 3001

module.exports = { mongoUrl, PORT }