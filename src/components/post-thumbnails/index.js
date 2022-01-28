import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'gatsby'
import './index.scss'

const PostThumbnails = ({ posts }) => {
  const renderThumbnails = posts.map((file) => {
    const { id, excerpt } = file.childMarkdownRemark
    const { stack, title, date, slug } = file.childMarkdownRemark.frontmatter
    return (
      <Link key={id} to={`/${stack}/${slug}`}>
        <div className="post-item-container">
          <div>
            <span className="post-item-title">{title}</span>
            <span className="post-item-date">
              <Moment format="YYYY-MM-DD">{date}</Moment>
            </span>
          </div>
          <div
            className="post-item-excerpt"
            dangerouslySetInnerHTML={{
              __html: excerpt,
            }}
          />
        </div>
      </Link>
    )
  })
  return <>{renderThumbnails}</>
}

PostThumbnails.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export { PostThumbnails }
