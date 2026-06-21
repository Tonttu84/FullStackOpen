const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (_root, args) => {
      let result = await Book.find({}).populate('author')
      if (args.author) result = result.filter(b => b.author.name === args.author)
      if (args.genre) result = result.filter(b => b.genres.includes(args.genre))
      return result
    },
    allAuthors: async () => await Author.find({}),
    me: (_root, _args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      if (!context.currentUser) throw new GraphQLError('not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' }
      })
      if (args.title.length < 5 || args.author.length < 4) {
        throw new GraphQLError('Title must be at least 5 characters long', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id })
      await book.save()
      return book.populate('author')
    },
    editAuthor: async (_root, args, context) => {
      if (!context.currentUser) throw new GraphQLError('not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' }
      })
      return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    },
    createUser: async (_root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save().catch(error => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error }
        })
      })
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
	_resetDatabase: async () => {
		if (process.env.NODE_ENV !== 'test') {
		  throw new GraphQLError('_resetDatabase is only available in test mode')
		}
		await Author.deleteMany({})
		await Book.deleteMany({})
		await User.deleteMany({})
		return true
	  },
  },
}

module.exports = resolvers
