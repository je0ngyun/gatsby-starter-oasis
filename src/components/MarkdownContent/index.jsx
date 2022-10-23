import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/markdown.scss'

const MarkdownContent = ({ html }) => {
  return <div id="markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

MarkdownContent.propTypes = {
  html: PropTypes.string,
}

export { MarkdownContent }
