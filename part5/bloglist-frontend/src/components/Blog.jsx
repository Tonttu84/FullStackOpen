


const Blog = ({ blog, handleLike, deleteBlog, user}) => {


	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	  }

	

	return(
  <div  data-testid="blog" style={blogStyle}>
    <h1 className="author"> {blog.author} </h1> 

	by {blog.title}
	
  
	
		<>

		<div>
		
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
  	{blog.url}
		</a>
		<br />
		Added by {blog.user.name}
		<br />
		
        
    	  <div className="likes">
		  {blog.likes} likes 
      	  
		{user &&( 
		<button onClick={() =>handleLike(blog)}>like</button>
		)}
		{user && blog.user.username == user.username && (
		<button onClick={() => deleteBlog(blog)}>remove</button> 
		)}
		</div>
		
		
      </div>
	  </>
	
  </div> 
  ) 
}

export default Blog