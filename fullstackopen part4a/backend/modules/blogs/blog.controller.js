const blogRouter = require('express').Router()
const Blog = require('./blog.model')



blogRouter.get('/', async (request, response) => {
	
	
	const blogs = await Blog.find({})
	response.json(blogs)
	
  })
  



blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)

	const result = await blog.save()
	response.json(result)

  })



  blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const result = await Blog.findByIdAndDelete(id)

  if (!result) {
    return response.status(404).json({ error: 'blog not found' })
  }

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