import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const PostDate = ({ date }) => {
  return <div className="date">{date}</div>
}

PostDate.propTypes = {
  date: PropTypes.string,
}

export { PostDate }
