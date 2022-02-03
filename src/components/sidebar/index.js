import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAllPosts } from '../../hooks'
import { FaCaretRight } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { SidebarCat } from '../sidebar-cat'
import { SidebarCatLinks } from '../../components/sidebar-cat-links'
import { SidebarCatHeader } from '../sidebar-cat-header'
import './index.scss'

const Sidebar = ({ directorys, currentPostId, currentCatName }) => {
  const [categoryStatus, setCategoryStatus] = useState(initCategoryStatus)
  const [isOpen, setIsOpen] = useState(false)
  const posts = useAllPosts()
  const catHeaderData = directorys[0]

  function initCategoryStatus() {
    const status = {}
    directorys.forEach((dir) => {
      if (currentCatName === dir.name) {
        status[dir.name] = true
      } else {
        status[dir.name] = false
      }
    })
    return status
  }

  const handleCategoryClick = function (categoryName) {
    setCategoryStatus((categoryStatus) => ({
      ...categoryStatus,
      [categoryName]: !categoryStatus[categoryName],
    }))
  }

  const handleBtnClick = function () {
    setIsOpen((isOpen) => !isOpen)
  }

  const getCategoryStatus = function (categoryName) {
    if (categoryStatus) return categoryStatus[categoryName]
    return false
  }

  const filterPosts = function (categoryName) {
    return posts.filter((post) => post.frontmatter.stack === categoryName)
  }

  const renderCategorys = directorys.slice(1).map((directory) => {
    const { name: dirName } = directory
    return (
      <SidebarCat
        categoryName={dirName}
        currentCatName={currentCatName}
        isOpen={getCategoryStatus(dirName)}
        handleCategoryClick={handleCategoryClick}
        key={dirName}
      >
        <SidebarCatLinks
          posts={filterPosts(dirName)}
          currentPostId={currentPostId}
        />
      </SidebarCat>
    )
  })

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => {
            handleBtnClick()
          }}
          className="side-bar-open-btn"
        >
          <FaCaretRight size={24} />
        </button>
      )}
      {isOpen && (
        <div className="side-bar">
          <div className="is-flex">
            <button
              onClick={() => {
                handleBtnClick()
              }}
              className="side-bar-close-btn"
            >
              <IoClose size={24} />
            </button>
          </div>
          <SidebarCatHeader
            headerData={catHeaderData}
            currentCatName={currentCatName}
          />
          {renderCategorys}
        </div>
      )}
    </>
  )
}

Sidebar.propTypes = {
  directorys: PropTypes.arrayOf(PropTypes.object),
  currentCatName: PropTypes.string,
  currentPostId: PropTypes.string,
}

export { Sidebar }
