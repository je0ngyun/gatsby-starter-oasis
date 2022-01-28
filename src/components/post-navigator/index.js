import React from 'react'
import { Link } from 'gatsby'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import PropTypes from 'prop-types'
import './index.scss'

const PostNavigator = ({ pageContext }) => {
  const { previous, next } = pageContext
  return (
    <div className="is-flex">
      {previous && (
        <div className="prev-post">
          <Link to={`/${previous.stack}/${previous.slug}`}>
            <div className="is-flex">
              <span>
                <i>
                  <FaCaretLeft size={20} />
                </i>
                이전 글
              </span>
            </div>
            <div>{previous.title}</div>
          </Link>
        </div>
      )}
      {next && (
        <div className="next-post">
          <Link to={`/${next.stack}/${next.slug}`}>
            <div className="is-flex">
              <span>
                다음 글
                <i>
                  <FaCaretRight size={20} />
                </i>
              </span>
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
