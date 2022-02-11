import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

const SidebarCatHeader = ({ headerData, currentCatName }) => {
  const { name, id } = headerData
  const isHighlight = currentCatName === name ? ' is-primary' : ''
  return (
    <div className={'side-bar-catgory-header' + isHighlight} key={id}>
      <Link className={isHighlight} to={`/${name}`}>
        {capitalize(name)}
      </Link>
    </div>
  )
}

SidebarCatHeader.propTypes = {
  headerData: PropTypes.object,
  currentCatName: PropTypes.string,
}

export { SidebarCatHeader }
