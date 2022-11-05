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

const SidebarCategory = ({
  children,
  categoryName,
  isHighlight,
  isOpen,
  handleCategoryClick,
  numOfPost,
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
        <div>
          <span>{'('}</span>
          <span className="num-of-post">{numOfPost}</span>
          <span>{')'}</span>
        </div>
        {getArrowIcon(isOpen)}
      </button>
      {isOpen && children}
    </div>
  )
}

SidebarCategory.propTypes = {
  children: PropTypes.node.isRequired,
  categoryName: PropTypes.string,
  isHighlight: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleCategoryClick: PropTypes.func,
  numOfPost: PropTypes.number,
}

export { SidebarCategory }
