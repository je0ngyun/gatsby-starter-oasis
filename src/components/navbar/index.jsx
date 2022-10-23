import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { extractTopLevelPathName } from '../../utils/extractTopLevelPathName'
import { rAFthrottle } from '../../utils/rAFthrottle'
import { Link } from 'gatsby'
import { Search } from '../Search'
import { AiOutlineMenu } from 'react-icons/ai'

import './index.scss'

const Navbar = ({ highlightLinkName, title, menu }) => {
  const scrollGaugeBar = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const onScroll = rAFthrottle(() => {
    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight
    const scrollY = window.scrollY
    const per = Math.round((scrollY / (docHeight - winHeight)) * 100)
    if (scrollGaugeBar.current) {
      scrollGaugeBar.current.style.width = `${per}%`
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () =>
      window.removeEventListener('scroll', onScroll, { passive: true })
  }, [])

  const handleCollapseClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const renderMenuLinks = menu.map((m) => {
    const isHighlight = highlightLinkName === extractTopLevelPathName(m.path)
    return (
      <Link
        className={classNames({ 'is-primary': isHighlight })}
        to={m.path}
        key={m.path}
      >
        {m.linkname}
      </Link>
    )
  })

  return (
    <>
      <nav className="nav-container">
        <div className="nav">
          <div className="nav-title">
            <Link to="/">{title}</Link>
          </div>
          <div className="nav-search">
            <Search />
          </div>
          <div className="nav-links">{renderMenuLinks}</div>
          <button onClick={handleCollapseClick} aria-label="collapse">
            <AiOutlineMenu size={24} />
          </button>
        </div>
        <div className={classNames('nav-links--mobile', { 'is-open': isOpen })}>
          {renderMenuLinks}
        </div>
        <div className="nav-underline-container">
          <div className="nav-underline"></div>
          <div ref={scrollGaugeBar} className="nav-scroll-gauge"></div>
        </div>
      </nav>
    </>
  )
}

Navbar.propTypes = {
  highlightLinkName: PropTypes.string,
  title: PropTypes.string,
  menu: PropTypes.arrayOf(PropTypes.object),
}

export { Navbar }
