import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with right details on form submission', async () => {
  // 1. Create a mock function for the form submission handler.
  const createBlog = vi.fn()
  const user = userEvent.setup()

  // 2. Render the BlogForm component, passing the mock function as a prop.
  render(<BlogForm handleBlog={createBlog} />)

  // 3. Find all the input fields and the save button.
  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('Url:')
  const saveButton = screen.getByText('Save')

  // 4. Simulate a user typing into each input field.
  const newBlog = {
    title: 'Testing forms with react-testing-library',
    author: 'John Tester',
    url: 'http://test-url.com',
  }
  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)

  // 5. Simulate clicking the save button to submit the form.
  await user.click(saveButton)

  // 6. Assert that the submission handler was called once.
  expect(createBlog).toHaveBeenCalledTimes(1)

  // 7. Assert that the handler was called with an object containing the correct details.
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
})
