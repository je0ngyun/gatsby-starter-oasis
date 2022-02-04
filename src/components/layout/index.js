import React from 'react'
import PropTypes from 'prop-types'
import { useMetadata } from '../../hooks/'
import { Navbar } from '../navbar'
import { ThemeSwitch } from '../theme-switch'
import { Footer } from '../footer'
import { MainContent } from '../main-content'
import './index.scss'

const Layout = ({ pageName, children }) => {
  const { title, slug, description, copyright, menu } = useMetadata()

  return (
    <div className="layout">
      <Navbar
        pageName={pageName}
        title={title}
        slug={slug}
        menu={JSON.parse(menu)}
      />
      <MainContent>
        <ThemeSwitch />
        {children}
      </MainContent>
      <Footer description={description} copyright={copyright} />
    </div>
  )
}

Layout.propTypes = {
  pageName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { Layout }
