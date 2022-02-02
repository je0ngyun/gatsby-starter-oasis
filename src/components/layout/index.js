import React from 'react'
import PropTypes from 'prop-types'
import { useMetadata } from '../../hooks/'
import { NavBar } from '../nav-bar'
import { ThemeSwitch } from '../theme-switch'
import { Footer } from '../footer'
import './index.scss'

const Layout = ({ pageName, children }) => {
  const { title, slug, description, copyright, menu } = useMetadata()

  return (
    <div className="layout is-flex is-direction-column">
      <NavBar
        pageName={pageName}
        title={title}
        slug={slug}
        menu={JSON.parse(menu)}
      />
      <ThemeSwitch />
      <div className="content">{children}</div>
      <Footer description={description} copyright={copyright} />
    </div>
  )
}

Layout.propTypes = {
  pageName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { Layout }
