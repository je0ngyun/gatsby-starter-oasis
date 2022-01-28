import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Search } from '../search'
import { AiOutlineMenu } from 'react-icons/ai'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

const NavBar = ({ pageName, title, slug, menu }) => {
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
    <div className="nav-container">
      <nav className="nav-bar is-flex">
        <Link to="/">
          <div className="title">
            {title}
            <span className="title-slug">{slug}</span>
          </div>
        </Link>
        <div className="search-box">
          <Search />
        </div>
        <div className="nav-links">{renderMenuLinks}</div>
        <span className="menu-btn">
          <AiOutlineMenu size={24} />
          <div className="mobile-nav-links is-flex is-direction-column">
            {renderMenuLinks}
          </div>
        </span>
      </nav>
    </div>
  )
}

NavBar.propTypes = {
  pageName: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  menus: PropTypes.arrayOf(PropTypes.object),
}

export { NavBar }
