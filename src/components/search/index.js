import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useAllPosts } from '../../hooks/'
import { AiOutlineSearch } from 'react-icons/ai'
import './index.scss'

const Search = () => {
  const data = useAllPosts()
  const emptyKeyword = ''
  const [state, setState] = useState({
    filteredData: [],
    keyword: emptyKeyword,
  })
  const [isEmptyResult, setResult] = useState(true)
  const [inputEleKey, setInputEleKey] = useState(0)

  const handleMouseDown = function (e) {
    e.preventDefault()
  }

  const handleInputBlur = function () {
    setResult((isEmptyResult) => (isEmptyResult = true))
    setInputEleKey((inputEleKey) => inputEleKey + 1)
  }

  const handleInputChange = function (event) {
    const keyword = event.target.value
    const posts = data || []
    const filteredData = posts.filter((post) => {
      const { desc, title, tags, tech } = post.frontmatter
      return (
        (desc && desc.toLowerCase().includes(keyword.toLowerCase())) ||
        (title && title.toLowerCase().includes(keyword.toLowerCase())) ||
        (tags && tags.toLowerCase().includes(keyword)) ||
        (tech && tech.toLowerCase().includes(keyword))
      )
    })
    setState({
      filteredData,
      keyword,
    })
    const hasSearchResults = filteredData && keyword !== emptyKeyword
    const postCount = hasSearchResults ? filteredData.length : 0
    if (postCount === 0) {
      setResult((isEmptyResult) => (isEmptyResult = true))
    } else {
      setResult((isEmptyResult) => (isEmptyResult = false))
    }
  }

  const renderSearchResults = function () {
    const { keyword, filteredData } = state
    const hasSearchResults = filteredData && keyword !== emptyKeyword
    const posts = hasSearchResults ? filteredData : []

    return (
      posts &&
      posts.map((post) => {
        const { excerpt, id } = post
        const { title, tags, stack, slug } = post.frontmatter
        return (
          <div className="result-item" key={id}>
            <Link to={`/${stack}/${slug}`}>
              <div className="result-title">{title}</div>
              <div className="result-tags is-flex is-flex-wrap">
                {tags.split(',').map((tag, index) => {
                  return <span key={index}>{tag}</span>
                })}
              </div>
              <div className="result-excerpt">{excerpt}</div>
            </Link>
          </div>
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
      <i className="search-icon">
        <AiOutlineSearch size={20} />
      </i>
      {!isEmptyResult && (
        <div
          role="button"
          tabIndex={0}
          onMouseDown={(e) => handleMouseDown(e)}
          className="result-container"
        >
          {renderSearchResults()}
        </div>
      )}
    </div>
  )
}

export { Search }
