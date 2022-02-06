import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/markdown.scss'

const PostContent = ({ html }) => {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

PostContent.propTypes = {
  html: PropTypes.string,
}

export { PostContent }
