import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const PostTags = ({ tags }) => {
  const renderTags = tags?.split(',').map((tag, idx) => {
    return <div key={idx}>{tag}</div>
  })
  return <div className="post-tags">{renderTags}</div>
}

PostTags.propTypes = {
  tags: PropTypes.string,
}

export { PostTags }
