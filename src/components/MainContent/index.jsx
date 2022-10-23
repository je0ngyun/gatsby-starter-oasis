import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const MainContent = ({ children }) => {
  return (
    <main className="main-container">
      <div className="main">{children}</div>
    </main>
  )
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export { MainContent }
