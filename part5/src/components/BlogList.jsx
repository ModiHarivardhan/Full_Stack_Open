import PropTypes from 'prop-types' // 1. Import PropTypes
import Blog from './Blog'

const BlogList = ({ blogs, user, handleLikes, handleDelete }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.filter(blog => blog.user && blog.user.username === user.username)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete} />
        )}
    </div>
  )
}

// 2. Add the propTypes definition
BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogList