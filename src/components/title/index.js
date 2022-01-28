import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const Title = ({ title }) => {
  return <h1 className="post-title">{title}</h1>
}

Title.propTypes = {
  title: PropTypes.string,
}

export { Title }
