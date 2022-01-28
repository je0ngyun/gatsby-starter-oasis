import React from 'react'
import { capitalize } from '../../utils/capitalize'
import { FaCaretRight, FaCaretDown } from 'react-icons/fa'
import PropTypes from 'prop-types'
import './index.scss'

const getArrowIcon = function (isCatOpen) {
  return isCatOpen ? (
    <i className="arrow active">
      <FaCaretDown size={22} />
    </i>
  ) : (
    <i className="arrow">
      <FaCaretRight size={22} />
    </i>
  )
}

const SidebarCat = ({
  children,
  categoryName,
  currentCatName,
  isOpen,
  handleCategoryClick,
}) => {
  const isHighlight = currentCatName === categoryName ? ' is-primary' : ''
  return (
    <div
      className={'sidebar-category is-flex is-direction-column ' + isHighlight}
    >
      <button
        onClick={() => {
          handleCategoryClick(categoryName)
        }}
      >
        <span className={'post-btn ' + isHighlight}>
          {capitalize(categoryName)}
          {getArrowIcon(isOpen)}
        </span>
      </button>
      {isOpen && children}
    </div>
  )
}

SidebarCat.propTypes = {
  children: PropTypes.node.isRequired,
  categoryName: PropTypes.string,
  currentCatName: PropTypes.string,
  isOpen: PropTypes.bool,
  handleCategoryClick: PropTypes.func,
}

export { SidebarCat }
