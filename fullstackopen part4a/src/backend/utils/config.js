import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.VAR_MONGO_URL
const PORT = process.env.VAR_PORT || 3001

export default { mongoUrl, PORT }