import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
const Footer = ({ copyright }) => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div>Built with Gatsby-starter-oasis</div>
        <div>{copyright}</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  copyright: PropTypes.string,
}

export { Footer }
