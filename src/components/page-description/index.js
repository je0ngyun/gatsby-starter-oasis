import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const PageDescription = ({ description }) => {
  return <div className="page-descripton">{description}</div>
}

PageDescription.propTypes = {
  description: PropTypes.string,
}

export { PageDescription }
