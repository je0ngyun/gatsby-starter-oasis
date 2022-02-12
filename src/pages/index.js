import React from 'react'
import { useTopLvFolderName } from '../hooks/'
import { Layout } from '../components/layout'
import { Link } from 'gatsby'
import { Title } from '../components/elements'
import { Seo } from '../components/seo'
import './index.scss'

const Home = () => {
  const pageName = 'home'
  const folderName = useTopLvFolderName()
  return (
    <Layout pageName={pageName} folderName={folderName}>
      <Seo title={pageName} />
      <Title title="Gatsby-Starter-Oasis" />
      <h3 className="is-primary">Welcome Oasis starter!</h3>
      <p>
        This page is the home screen that you can see in the beginning.
        <br />
        You can modify it in the{' '}
        <span className="is-primary">./pages/index.js</span> file.
      </p>
      <h3>Document</h3>
      <ul className="doc-links">
        <li>
          <Link to="/docs/quick-start">Quick Start</Link>
        </li>
        <li>
          <Link to="/docs/page-creation-guide">Page creation guide</Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home
