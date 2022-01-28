import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const Container = ({ children }) => {
  return <div className="main-container">{children}</div>
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Container }
