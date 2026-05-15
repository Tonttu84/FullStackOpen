import { render, screen } from '@testing-library/react'
import AddBlog from './components/AddBlog'
import userEvent from '@testing-library/user-event'

test('<Addblog /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockCreate = vi.fn()
  const user = userEvent.setup()

  render(<AddBlog createBlog={mockCreate} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')

  const openButton = screen.getByText('create new blog')
  await user.click(openButton)


  const inputs = screen.getAllByRole('textbox')


  await user.type(inputs[0], 'React Testing')
  await user.type(inputs[1], 'Matti')
  await user.type(inputs[2], 'www.test.com')

  const createButton = screen.getByText('create')
  await user.click(createButton)

})