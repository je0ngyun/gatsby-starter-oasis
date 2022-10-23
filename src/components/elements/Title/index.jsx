import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ title, ...rest }) => {
  return <h1 {...rest}>{title}</h1>
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
}

export { Title }
