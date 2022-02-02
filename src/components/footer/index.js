import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
const Footer = ({ description, copyright }) => {
  return (
    <div className="footer-container">
      <footer>
        <div>{description}</div>
        <div>{copyright}</div>
      </footer>
    </div>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  copyright: PropTypes.string,
}

export { Footer }
