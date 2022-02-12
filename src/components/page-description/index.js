import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const PageDescription = ({ title, description }) => {
  return (
    <div className="page-descripton">
      <span className="is-primary">{title}</span>
      {description}
    </div>
  )
}

PageDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export { PageDescription }
