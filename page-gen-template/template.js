import React from 'react'
import PropTypes from 'prop-types'
import { useTopLevelPathName } from '../../hooks/'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { PostItems } from '../../components/post-items'
import { PageDescription } from '../../components/page-description'
import { PageTitle } from '../../components/page-title'
import { capitalize } from '../../utils/capitalize'

const Index = ({ data }) => {
  const pageName = capitalize('PN#####')
  const posts = data.posts.nodes
  const directorys = data.directorys.nodes
  const folderName = useTopLevelPathName()
  const description = 'DS#####'

  return (
    <Layout pageName={pageName} folderName={folderName}>
      <Seo title={pageName} description={description} />
      <Sidebar directorys={directorys} currentCatName={folderName} />
      <PageTitle title={pageName} />
      <PageDescription title={pageName} description={description} />
      <PostItems posts={posts} />
    </Layout>
  )
}

Index.propTypes = {
  data: PropTypes.object,
}

export default Index

export const qurey = graphql`
  query PN#####Page {
    directorys: allDirectory(
      filter: {
        sourceInstanceName: { eq: "PN#####" }
        relativeDirectory: { regex: "/^$|^..$/" }
      }
      sort: { order: ASC, fields: birthtime }
    ) {
      nodes {
        id
        name
      }
    }
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "PN#####" }
        absolutePath: { regex: "/.md$/" }
      }
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date(formatString: "MMMM DD , YYYY")
            title
          }
          excerpt(truncate: true)
          id
        }
      }
    }
  }
`
