import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Date = ({ date, className, ...rest }) => {
  return (
    <div className={classNames('date', className)} {...rest}>
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
