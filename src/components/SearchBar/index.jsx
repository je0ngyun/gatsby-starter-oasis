import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineSearch } from 'react-icons/ai'
import './index.scss'
import { useState } from 'react'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
      <i>
        <AiOutlineSearch size={20} />
      </i>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Title, tag search"
      />
      <div className="nav-underline"></div>
    </div>
  )
}

SearchBar.defaultProps = {}
SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export { SearchBar }
//
