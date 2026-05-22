


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
    <h3 className="author"> {blog.author} : {blog.title}</h3> 
	
  
	
		<>

		<div>
		
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
  	{blog.url}
		</a>
        
    	  <div className="likes">
        	likes: {blog.likes}
      	  
		{user &&( 
		<button onClick={() =>handleLike(blog)}>like</button>
		)}
		</div>
		
		added by {blog.user.name}
		<br />
		{user && blog.user.username == user.username && (
		<button onClick={() => deleteBlog(blog)}>remove</button> 
		)}
      </div>
	  </>
	
  </div> 
  ) 
}

export default Blog