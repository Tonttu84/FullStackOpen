import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`



export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
      author {
		name
	}
      published
      genres
    }
  }
  `


export const EDIT_WRITER = gql`
mutation editWriter(
	$name: String!, 
	$setBornTo: Int!
	) {
		editAuthor(
			name: $name, 
			setBornTo: $setBornTo) {
				id
				name
				born
				bookCount
			}

	}
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const LOGIN = gql`
	mutation Login(
	$username: String!, 
	$password: String!
	) {
		login(
			username: $username, 
			password: $password) {
				value
			}

	}

`