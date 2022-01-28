import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import './index.scss'

const PostDate = ({ date }) => {
  return (
    <div className="date">
      <Moment format="YYYY-MM-DD">{date}</Moment>
    </div>
  )
}

PostDate.propTypes = {
  date: PropTypes.string,
}

export { PostDate }
