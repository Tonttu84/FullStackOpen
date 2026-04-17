const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('./blog.model')



blogRouter.get('/', async (request, response) => {
	
	
	const blogs = await Blog.find({})
	response.json(blogs)
	
  })
  



blogRouter.post('/', async (request, response) => {
	const blog = new Blog({
  title: request.body.title,
  author: request.body.author,
  url: request.body.url
})
  
  const decoded = jwt.verify(request.token, process.env.SECRET)
  request.userId = decoded.id
  const user = await User.findById(request.userId)

  if (!user) { return response.status(401).json({ error: 'invalid token' }) }

  blog.user = user._id

	const result = await blog.save()
	response.json(result)

  })



  blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const decoded = jwt.verify(request.token, process.env.SECRET)

  if (!decoded.id) {
    console.warn("Invalid id")
    return response.status(401).json({ error: 'invalid token' })
  }


  const blog = await Blog.findById(id)
   if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  
 

  if (!blog.user.equals(decoded.id)) {
  return response.status(403).json({ error: 'forbidden' })
}

  await blog.deleteOne()

  response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    newBlog,
    { new: true, runValidators: true }
  )

  if (!result) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(result)
})


module.exports = blogRouter