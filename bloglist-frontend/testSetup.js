import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Blog from './src/components/Blog'
import mongoose from 'mongoose'



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