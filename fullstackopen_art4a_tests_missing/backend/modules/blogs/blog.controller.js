const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('./blog.model.js')

const { tokenExtractor, userExtractor } = require('../../middleware/auth.js')



blogRouter.get('/', async (request, response) => {
	
	
	const blogs = await Blog.find({})
	response.json(blogs)
	
  })
  



blogRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
	const blog = new Blog({
  title: request.body.title,
  author: request.body.author,
  url: request.body.url
})
  
  const user = await User.findById(request.userId)

  if (!user) { return response.status(401).json({ error: 'invalid token' }) }

  blog.user = user._id

	const result = await blog.save()
	response.json(result)

  })



  blogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { id } = request.params

  
  const blog = await Blog.findById(id)
   if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  
 
  if (!blog.user.equals(request.userId)) {
  return response.status(403).json({ error: 'forbidden' })
}

  await blog.deleteOne()

  response.status(204).end()
})


blogRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { id } = request.params
  const userId = request.userId

  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const result = await Blog.findOneAndUpdate(
    { _id: id, user: userId }, 
    updatedBlog,
    { new: true, runValidators: true }
  )

  if (!result) {
    return response.status(404).json({ error: 'blog not found or unauthorized' })
  }

  response.json(result)
})


module.exports = blogRouter