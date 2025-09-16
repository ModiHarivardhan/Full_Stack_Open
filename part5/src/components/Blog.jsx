import PropTypes from 'prop-types'
import BlogTogglable from './BlogTogglable'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    marginLeft: '5px',
  }

  return (
    <div className="blog">
      <div className="blog-summary">
        Title: {blog.title} Author: {blog.author}
      </div>
      <BlogTogglable buttonLabel="View">
        <div className="blog-details">
          Url: {blog.url} <br />
          likes: {blog.likes}{' '}
          <button onClick={() => handleLikes(blog)}>Like</button> <br />
          Created by: {blog.user.username} <br />
          <button style={deleteButtonStyle} onClick={() => handleDelete(blog)}>
            Delete
          </button>
        </div>
      </BlogTogglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog

