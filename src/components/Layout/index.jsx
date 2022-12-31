import React from 'react'
import PropTypes from 'prop-types'
import { useMetadata } from '../../hooks/'
import { Navbar } from '../Navbar'
import { ThemeSwitch } from '../ThemeSwitch'
import { Footer } from '../Footer'
import { MainContent } from '../MainContent'

const Layout = ({ belongs, children }) => {
  const { title, description, copyright, menu } = useMetadata()

  return (
    <div className="layout">
      <Navbar
        highlightLinkName={belongs}
        title={title}
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
  belongs: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { Layout }
