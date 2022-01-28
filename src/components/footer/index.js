import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
const Footer = ({ description, copyright }) => {
  return (
    <footer className="footer is-flex">
      <div className="is-flex is-direction-column">
        <p>{description}</p>
        <p>{copyright}</p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  copyright: PropTypes.string,
}

export { Footer }
