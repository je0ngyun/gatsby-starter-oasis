import React from 'react'
import classNames from 'classnames'
import { capitalize } from '../../utils/capitalize'
import { useTopLvFolderName } from '../../hooks'
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
  const isHighlight = currentCatName === categoryName

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
  currentCatName: PropTypes.string,
  isOpen: PropTypes.bool,
  handleCategoryClick: PropTypes.func,
}

export { SidebarCat }
