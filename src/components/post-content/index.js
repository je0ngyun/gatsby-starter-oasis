import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const PostContent = ({ html }) => {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

PostContent.propTypes = {
  html: PropTypes.string,
}

export { PostContent }
