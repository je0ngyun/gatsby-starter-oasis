import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const PageDescription = ({ title, description }) => {
  return (
    <li className="page-descripton">
      <span>{title + ' '}</span>
      {description}
    </li>
  )
}

PageDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export { PageDescription }
