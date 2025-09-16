import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, beforeEach, vi } from 'vitest' // <-- Import 'vi' for mocking
import Blog from './Blog'

// We define the test suite for the Blog component
describe('<Blog />', () => {
  // Define a sample blog object to be used in tests
  const blog = {
    title: 'Component testing with react-testing-library',
    author: 'Jane Doe',
    url: 'https://react-testing-library.com/',
    likes: 15,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  let container
  const mockHandleLikes = vi.fn()

  // beforeEach runs before each test, rendering the component
  beforeEach(() => {
    // We pass the mock function as the handleLikes prop and capture the container
    container = render(
      <Blog blog={blog} handleLikes={mockHandleLikes} handleDelete={() => {}} />
    ).container
  })

  // Test case for step 5.13
  test('renders title and author, but not url or likes by default', () => {
    const detailsDiv = container.querySelector('.blog-details')
    // Check that the details are not visible initially
    expect(detailsDiv).not.toBeVisible()
  })

  // Test case for step 5.14 (FIXED)
  test('shows url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    // Find the details div by its class name
    const detailsDiv = container.querySelector('.blog-details')

    // Assert that this container is now visible
    expect(detailsDiv).toBeVisible()

    // Assert that it contains the expected URL and likes text.
    // toHaveTextContent is more flexible than getByText.
    expect(detailsDiv).toHaveTextContent(
      'Url: https://react-testing-library.com/'
    )
    expect(detailsDiv).toHaveTextContent(
      'likes: 15'
    )
  })

  // Test case for step 5.15
  test('like button event handler is called twice when clicked twice', async () => {
    // First, make the details visible
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    // Find the like button and click it twice
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Assert that the mock function was called exactly two times
    expect(mockHandleLikes.mock.calls).toHaveLength(2)
  })
})

