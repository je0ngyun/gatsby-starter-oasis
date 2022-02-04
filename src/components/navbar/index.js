import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Search } from '../search'
import { AiOutlineMenu } from 'react-icons/ai'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

const Navbar = ({ pageName, title, slug, menu }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCollapseClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const renderMenuLinks = menu.map((m) => {
    const isHighlight =
      capitalize(pageName) === capitalize(m.title) ? ' is-primary' : ''
    return (
      <Link className={isHighlight} to={m.path} key={m.path}>
        {m.content}
      </Link>
    )
  })

  return (
    <nav className="nav-container">
      <div className="nav">
        <div className="nav-title">
          <Link to="/">{title}</Link>
        </div>
        <div className="nav-search">
          <Search />
        </div>
        <div className="nav-links">{renderMenuLinks}</div>
        <button onClick={handleCollapseClick} className="nav-menu-btn">
          <AiOutlineMenu size={24} />
        </button>
      </div>
      <div className={'nav-links--mobile ' + (isOpen ? 'is-open' : '')}>
        {renderMenuLinks}
      </div>
      <div className="nav-underline"></div>
    </nav>
  )
}

Navbar.propTypes = {
  pageName: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  menus: PropTypes.arrayOf(PropTypes.object),
}

export { Navbar }
