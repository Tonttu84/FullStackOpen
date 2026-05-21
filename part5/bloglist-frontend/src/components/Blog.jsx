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

	

	return(
  <div  data-testid="blog" style={blogStyle}>
    <div className="title">{blog.title}</div>
	<div className="author">{blog.author}</div> 
	{!showAll && (
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
    	  <div className="likes">
        	likes: {blog.likes}
      	  </div>
		
		<button onClick={() =>handleLike(blog)}>like</button>
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