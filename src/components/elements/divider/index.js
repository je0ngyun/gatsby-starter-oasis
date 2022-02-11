import React from 'react'
import PropTypes from 'prop-types'

const Divider = ({ style, className }) => (
  <div style={style} className={className} />
)

Divider.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

export { Divider }
