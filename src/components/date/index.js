import React from 'react'
import PropTypes from 'prop-types'

const Date = ({ date, className, style }) => {
  return (
    <div className={'date ' + className} style={style}>
      {date}
    </div>
  )
}

Date.propTypes = {
  date: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export { Date }
