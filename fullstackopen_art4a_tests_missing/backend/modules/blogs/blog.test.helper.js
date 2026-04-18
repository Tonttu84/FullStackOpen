const jwt = require('jsonwebtoken')

const createToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: '1h'
  })
}

module.exports = { createToken }