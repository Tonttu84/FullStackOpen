import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './components/Blog'
import { vi } from 'vitest'



afterEach(() => {
  cleanup()
})







test('renders title and author but not url or likes by default', () => {
  const validBlog = {
    title: 'Testing with Vitest',
    author: 'Jane Developer',
    url: 'https://example.com/testing-vitest',
    likes: 5,
    user: '123'
  }

  render(<Blog blog={validBlog} />)

  // should exist
  expect(screen.getByText('Testing with Vitest')).toBeInTheDocument()
  expect(screen.getByText('Jane Developer')).toBeInTheDocument()

  // should NOT exist
  expect(screen.queryByText('https://example.com/testing-vitest')).toBeNull()
  expect(screen.queryByText('5')).toBeNull()
})

//Blog = ({ blog, handleLike, deleteBlog, user

test(' blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
	const validBlog = {
		title: 'Testing with Vitest',
		author: 'Jane Developer',
		url: 'https://example.com/testing-vitest',
		likes: 5,
		user: '123'
	  }
	
	const mockHandler = vi.fn()
  
	render(
	  <Blog blog={validBlog} 
	  handleLike={mockHandler}
	  user={{ username: 'someone' }} 
	  />
	)
  
	const user = userEvent.setup()
	const unhidebutton = screen.getByText('view')
	await user.click(unhidebutton)
	
  	
	expect(screen.queryByText('https://example.com/testing-vitest')).toBeInTheDocument()
  	expect(screen.queryByText('5')).toBeInTheDocument()

	
  })


test('clicking the button calls event handler once', async () => {
	const validBlog = {
		title: 'Testing with Vitest',
		author: 'Jane Developer',
		url: 'https://example.com/testing-vitest',
		likes: 5,
		user: '123'
	  }
	
	const mockHandler = vi.fn()
  
	render(
	  <Blog blog={validBlog} 
	  handleLike={mockHandler}
	  user={{ username: 'someone' }} 
	  />
	)
  
	const user = userEvent.setup()
	const unhidebutton = screen.getByText('view')
	await user.click(unhidebutton)
	const button = screen.getByText('like')
	
	await user.click(button)
	await user.click(button)
  
	expect(mockHandler.mock.calls).toHaveLength(2)
  })

  
 