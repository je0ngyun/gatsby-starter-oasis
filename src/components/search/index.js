import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useAllPosts } from '../../hooks/'
import { AiOutlineSearch } from 'react-icons/ai'
import './index.scss'

const Search = () => {
  const data = useAllPosts()
  const [filteredData, setFilteredDate] = useState([])
  const [inputEleKey, setInputEleKey] = useState(0)

  const handleResultMouseDown = function (e) {
    e.preventDefault()
  }

  const handleInputBlur = function () {
    setFilteredDate([])
    setInputEleKey(inputEleKey + 1)
  }

  const handleInputChange = function (e) {
    const keyword = e.target.value
    const posts = data || []
    const filteredData = posts.filter((post) => {
      const { desc, title, tags, tech } = post.childMarkdownRemark.frontmatter
      return (
        (desc && desc.toLowerCase().includes(keyword.toLowerCase())) ||
        (title && title.toLowerCase().includes(keyword.toLowerCase())) ||
        (tags && tags.toLowerCase().includes(keyword)) ||
        (tech && tech.toLowerCase().includes(keyword))
      )
    })

    setFilteredDate(() => (keyword ? filteredData : []))
  }

  const renderSearchResults = function () {
    const posts = filteredData
    return (
      posts &&
      posts.map((post) => {
        const { id, relativeDirectory } = post
        const { title, slug } = post.childMarkdownRemark.frontmatter
        return (
          <Link
            key={id}
            to={`/${relativeDirectory}/${slug}`}
            className="search-result-item"
          >
            <div className="search-result-title">{title}</div>
          </Link>
        )
      })
    )
  }

  return (
    <div className="search-box">
      <input
        type="text"
        aria-label="Search"
        onChange={(e) => handleInputChange(e)}
        onBlur={(e) => handleInputBlur(e)}
        key={inputEleKey}
      />
      <i>
        <AiOutlineSearch size={20} />
      </i>
      {filteredData.length > 0 && (
        <div
          role="button"
          tabIndex={0}
          onMouseDown={(e) => handleResultMouseDown(e)}
          className="search-result-container"
        >
          {renderSearchResults()}
        </div>
      )}
    </div>
  )
}

export { Search }
