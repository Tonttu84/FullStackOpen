import { useState } from 'react'


const Blog = ({ blog, handleLike, deleteBlog, user}) => {
	const [showAll, setShowAll] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	  }

	  console.log(blog.user)
	  console.log(blog.user.username)
	  console.log(user)
	  console.log(user.username)
	  console.log('This is the blog at components', blog)
	  console.log('BLOG ID:', blog.id)

	return(
  <div style={blogStyle}>
    {blog.title} {blog.author}  {!showAll && (
      <button onClick={() => setShowAll(true)}>
        view
      </button>
    )}
  
	{showAll && (
		<>
		<button onClick={() => setShowAll(false)}>hide</button>  
		<div>
		
        {blog.url}
        <br />
        likes: {blog.likes} <button onClick={() =>handleLike(blog)}>like</button>
		<br />
		{blog.user.name}
		<br />
		{blog.user.username == user.username && (
		<button onClick={() => deleteBlog(blog)}>delete</button> 
		)}
      </div>
	  </>
	)}
  </div> 
  ) 
}

export default Blog