import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { extractTopLevelPathName } from '../../utils/extractTopLevelPathName'
import { useAllPosts } from '../../hooks'
import { FaCaretRight } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { SidebarCategory } from '../SidebarCategory'
import { SidebarCategoryLinks } from '../SidebarCategoryLinks'
import { SidebarCategoryHeader } from '../SidebarCategoryHeader'
import './index.scss'

const Sidebar = ({ directorys, currentPostId, currentCategoryName }) => {
  const [categoryStatus, setCategoryStatus] = useState(initCategoryStatus)
  const [isOpen, setIsOpen] = useState(false)
  const posts = useAllPosts()
  const categoryHeaderData = directorys[0]

  function initCategoryStatus() {
    const status = {}
    directorys.forEach((directory) => {
      if (currentCategoryName === directory.name) {
        status[directory.name] = true
      } else {
        status[directory.name] = false
      }
    })
    return status
  }

  const handleCategoryClick = useCallback(function (categoryName) {
    setCategoryStatus((categoryStatus) => ({
      ...categoryStatus,
      [categoryName]: !categoryStatus[categoryName],
    }))
  }, [])

  const handleBtnClick = function () {
    setIsOpen((isOpen) => !isOpen)
  }

  const getCategoryStatus = function (categoryName) {
    if (categoryStatus) return categoryStatus[categoryName]
    return false
  }

  const extractPostsbyCategory = function (categoryName) {
    return posts.filter((post) => {
      const { slug } = post.childMarkdownRemark.fields
      return extractTopLevelPathName(slug) === categoryName
    })
  }

  const renderCategorys = directorys.slice(1).map((directory) => {
    const { name: directoryName } = directory
    const filteredPosts = extractPostsbyCategory(directoryName)
    return (
      <SidebarCategory
        categoryName={directoryName}
        isHighlight={currentCategoryName === directoryName}
        isOpen={getCategoryStatus(directoryName)}
        handleCategoryClick={handleCategoryClick}
        key={directoryName}
        numOfPost={filteredPosts.length}
      >
        <SidebarCategoryLinks
          posts={filteredPosts}
          currentPostId={currentPostId}
        />
      </SidebarCategory>
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
          <i>
            <FaCaretRight size={26} />
          </i>
        </button>
      )}
      {isOpen && (
        <div className="side-bar">
          <div className="side-bar-close-btn">
            <button
              onClick={() => {
                handleBtnClick()
              }}
            >
              <IoClose size={24} />
            </button>
          </div>
          <SidebarCategoryHeader
            headerData={categoryHeaderData}
            currentCategoryName={currentCategoryName}
          />
          {renderCategorys}
        </div>
      )}
    </>
  )
}

Sidebar.propTypes = {
  directorys: PropTypes.arrayOf(PropTypes.object),
  currentCategoryName: PropTypes.string,
  currentPostId: PropTypes.string,
}

export { Sidebar }
