import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

const SidebarCategoryHeader = ({ headerData, currentCategoryName }) => {
  const { name, id } = headerData
  const isHighlight = currentCategoryName === name

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

SidebarCategoryHeader.propTypes = {
  headerData: PropTypes.object,
  currentCategoryName: PropTypes.string,
}

export { SidebarCategoryHeader }
