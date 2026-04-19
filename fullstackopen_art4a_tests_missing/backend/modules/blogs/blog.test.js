const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const listHelper = require('./blog.test.helper')
const Blog = require('./blog.model')
const User = require('../users/user.model')
const db = require('./blog.test.database')
const {blogs} = require('./blog.test.data')


const api = supertest(app)

const initialBlogs = 5;

/*



4.4: Helper Functions and Unit Tests, step 2
Define a new totalLikes function that 
receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.


*/

beforeAll(async () => {
  await db.connect()
})

beforeEach(async () => {
  console.log('CLEARING DB')
  await db.clearDatabase()

  console.log('SEEDING DB')
  await db.seedDatabase()

  console.log('DONE SEEDING')
})

afterAll(async () => {
  await db.closeDatabase()
})


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  
  

  test('when list has only one blog, equals the likes of that', () => {

  
  

    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })


  test('It works with multiple blogs too', () => {

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)

     })

})


test('I can find the author with most blogs', () => {

    const result = listHelper.mostBlogs(blogs)
    expect(result).toStrictEqual({
  author: "Robert C. Martin",
  blogs: 3
})

     })

test('I can find the author with most likes in all blogs', () => {

    const result = listHelper.mostLikes(blogs)
    expect(result).toStrictEqual({
  author: "Edsger W. Dijkstra",
  likes: 17
})

     })     


test('notes are returned as json',  async () => {


  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

	expect(response.body.length).toBe(initialBlogs)
})


test('blogs have id property instead of _id', async () => {
	const response = await api.get('/api/blogs')
  
	response.body.forEach(blog => {
	  expect(blog.id).toBeDefined()
	  expect(blog._id).toBeUndefined()
	})
  })



  test('a valid blog owned by the user can be added and it increases the size by one', async () => {

  const token = listHelper.createToken()

	const newBlog = {
	  title: 'New blog',
	  author: 'Me',
	  url: 'http://example.com'
	}
  
	await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(201)
  
	const response = await api.get('/api/blogs')
  
	expect(response.body.length).toBe(initialBlogs + 1)
  })

  test('if likes is missing, it defaults to zero', async () => {
	const newBlog = {
	  title: 'extra new blog',
	  author: 'Metoo',
	  url: 'http://fakeexample.com'
	}
  
	const response = await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(201)
  
	expect(response.body.likes).toBe(0)
  })

  test('missing title returns 400', async () => {
	const newBlog = {
	  author: 'Metootoo',
	  url: 'http://fakefakeexample.com'
	}
  
	await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(400)
  })
  
  test('missing url returns 400', async () => {
	const newBlog = {
	  author: 'unknown',
	  title: 'myTitle'
	}
  
	await api
	  .post('/api/blogs')
	  .send(newBlog)
	  .expect(400)
  })


  test("deleting existing posts work", async () => {
  const newBlog = {
    title: 'extra new new blog',
    author: 'Metootiii',
    url: 'http://fakeexampleeeee.com'
  }

  const created = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const id = created.body.id

  const response = await api.get('/api/blogs')

 await api
  	.delete(`/api/blogs/${id}`)
    .expect(204)

  const responseAfterDelete = await api.get('/api/blogs')

  const ids = responseAfterDelete.body.map(b => b.id)

  expect(ids).not.toContain(id)
})

test("Modifying old blogs works", async () => {
  const newBlog = {
    title: 'extra new new blogg',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm'
  }

  const created = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const id = created.body.id

  const editedBlog = {
    title: 'updated title',
    author: 'Metootiiii',
    url: 'http://fakeexampleeeee.comm',
    likes: 2
  }

  const updated = await api
    .put(`/api/blogs/${id}`)
    .send(editedBlog)
    .expect(200)

  expect(updated.body.title).toBe('updated title')
  expect(updated.body.likes).toBe(2)
})

