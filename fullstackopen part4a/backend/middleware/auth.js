const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'token missing' })
  }

  const token = authorization.replace('Bearer ', '')

  request.token = token

  return next(); //early return for now before verification

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        logger.warn({
        message: 'Token missing id',
        }) 
        return response.status(401).json({ error: 'token invalid' })
    }

    request.userId = decodedToken.id
    request.token = token

    next()
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }


}

module.exports = userExtractor