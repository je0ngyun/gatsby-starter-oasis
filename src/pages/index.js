import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from '../components/layout'
import { graphql } from 'gatsby'
import { Divider } from '../components/elements'
import { MarkdownContent } from '../components/markdown-content'
import { Author } from '../components/author'
import { Seo } from '../components/seo'
import { useTopLevelPathName } from '../hooks'
import './index.scss'

const Index = ({ data: { allMarkdownRemark } }) => {
  const { html } = allMarkdownRemark.nodes[0]
  const topLevelPathName = useTopLevelPathName()

  return (
    <Layout belongs={topLevelPathName}>
      <Seo />
      <Author />
      <Divider style={{ marginBottom: '50px' }} />
      <MarkdownContent html={html} />
      <Divider style={{ marginBottom: '50px' }} />
    </Layout>
  )
}

Index.propTypes = {
  data: PropTypes.object,
}

export default Index

export const qurey = graphql`
  query IndexMd {
    allMarkdownRemark(filter: { fields: { slug: { eq: "/" } } }) {
      nodes {
        html
      }
    }
  }
`
