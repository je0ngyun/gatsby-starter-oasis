import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

const SidebarCatHeader = ({ headerData, currentCatName }) => {
  const { name, id } = headerData
  const isHighlight = currentCatName === name

  return (
    <div
      className={classNames('side-bar-catgory-header', {
        'is-primary': isHighlight,
      })}
      key={id}
    >
      <Link to={`/${name}`}>{capitalize(name)}</Link>
    </div>
  )
}

SidebarCatHeader.propTypes = {
  headerData: PropTypes.object,
  currentCatName: PropTypes.string,
}

export { SidebarCatHeader }
