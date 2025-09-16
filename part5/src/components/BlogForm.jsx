import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlog }) => {
  // The form now manages its own state internally.
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    // When submitted, it calls the event handler with an object
    // containing the current state.
    handleBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
    // And then resets its own fields.
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <br />
      <div>
        <form onSubmit={addBlog}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={blogTitle}
                onChange={({ target }) => setBlogTitle(target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Author:
              <input
                type="text"
                value={blogAuthor}
                onChange={({ target }) => setBlogAuthor(target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Url:
              <input
                type="text"
                value={blogUrl}
                onChange={({ target }) => setBlogUrl(target.value)}
              />
            </label>
          </div>
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

// The prop types are now simplified as the component
// only needs the submission handler.
BlogForm.propTypes = {
  handleBlog: PropTypes.func.isRequired,
}

export default BlogForm


