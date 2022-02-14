import React from 'react'
import { Link } from 'gatsby'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import PropTypes from 'prop-types'
import './index.scss'

const PostNavigator = ({ pageContext }) => {
  const { previous, next } = pageContext
  return (
    <div className="post-navigator">
      {previous && (
        <div className="post-navigator-prev-link">
          <Link to={`/${previous.sourceInstanceName}${previous.slug}`}>
            <div className="post-signpost">
              <i>
                <FaCaretLeft size={20} />
              </i>
              <span>Previous post</span>
            </div>
            <div>{previous.title}</div>
          </Link>
        </div>
      )}
      {next && (
        <div className="post-navigator-next-link">
          <Link to={`/${next.sourceInstanceName}${next.slug}`}>
            <div className="post-signpost">
              <span>Next post</span>
              <i>
                <FaCaretRight size={20} />
              </i>
            </div>
            <div>{next.title}</div>
          </Link>
        </div>
      )}
    </div>
  )
}

PostNavigator.propTypes = {
  pageContext: PropTypes.object,
}

export { PostNavigator }
