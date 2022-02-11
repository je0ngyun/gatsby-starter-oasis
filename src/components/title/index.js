import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ title, style, className }) => {
  return (
    <h1 className={className} style={style}>
      {title}
    </h1>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export { Title }
