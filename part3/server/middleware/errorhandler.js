const errorHandler = (error, req, res, next) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
	  return res.status(400).json({ error: 'malformatted id' })
	}
  
	if (error.name === 'ValidationError') {
	  return res.status(400).json({ error: error.message })
	}
  

	res.status(500).json({ error: 'internal server error' })
  }
  
  export default errorHandler