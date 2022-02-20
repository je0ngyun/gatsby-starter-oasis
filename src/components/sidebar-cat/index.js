import React from 'react'
import classNames from 'classnames'
import { capitalize } from '../../utils/capitalize'
import { GoTriangleRight, GoTriangleDown } from 'react-icons/go'
import PropTypes from 'prop-types'
import './index.scss'

const getArrowIcon = function (isCatOpen) {
  return isCatOpen ? (
    <i className="arrow active">
      <GoTriangleDown size={18} />
    </i>
  ) : (
    <i className="arrow">
      <GoTriangleRight size={18} />
    </i>
  )
}

const SidebarCat = ({
  children,
  categoryName,
  isHighlight,
  isOpen,
  handleCategoryClick,
}) => {
  return (
    <div
      className={classNames('side-bar-category', { 'is-primary': isHighlight })}
    >
      <button
        onClick={() => {
          handleCategoryClick(categoryName)
        }}
      >
        {capitalize(categoryName)}
        {getArrowIcon(isOpen)}
      </button>
      {isOpen && children}
    </div>
  )
}

SidebarCat.propTypes = {
  children: PropTypes.node.isRequired,
  categoryName: PropTypes.string,
  isHighlight: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleCategoryClick: PropTypes.func,
}

export { SidebarCat }
