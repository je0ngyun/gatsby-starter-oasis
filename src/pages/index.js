import React from 'react'
import { Layout } from '../components/layout'
import { Link, graphql } from 'gatsby'
import { Divider } from '../components/elements'
import { MarkdownContent } from '../components/markdown-content'
import { Title } from '../components/elements'
import { Seo } from '../components/seo'
import { useTopLevelPathName } from '../hooks'
import './index.scss'

const Home = ({ data: { allMarkdownRemark } }) => {
  const { html } = allMarkdownRemark.nodes[0]
  const topLevelPathName = useTopLevelPathName()

  return (
    <Layout belongs={topLevelPathName}>
      <Seo />
      <Divider style={{ marginBottom: '50px' }} />
      <MarkdownContent html={html} />
    </Layout>
  )
}

export default Home

export const qurey = graphql`
  query IndexMd {
    allMarkdownRemark(filter: { fields: { slug: { eq: "/" } } }) {
      nodes {
        html
      }
    }
  }
`
