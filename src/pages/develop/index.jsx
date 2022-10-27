import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../../components/Layout'
import { Seo } from '../../components/Seo'
import { Sidebar } from '../../components/Sidebar'
import { PostItems } from '../../components/PostItems'
import { PageDescription } from '../../components/PageDescription'
import { PageTitle } from '../../components/PageTitle'
import { capitalize } from '../../utils/capitalize'
import { useTopLevelPathName } from '../../hooks'

const Index = ({ data }) => {
  const topLevelPathName = useTopLevelPathName()
  const pageName = capitalize(topLevelPathName)
  const posts = data.posts.nodes
  const directorys = data.directorys.nodes
  const description =
    'It contains posts about concepts and troubleshooting processes required during development.'

  return (
    <Layout belongs={topLevelPathName}>
      <Seo title={pageName} />
      <Sidebar directorys={directorys} currentCategoryName={topLevelPathName} />
      <PageTitle title={pageName} />
      <PageDescription description={description} />
      <PostItems posts={posts} />
    </Layout>
  )
}

Index.propTypes = {
  data: PropTypes.object,
}

export default Index

export const qurey = graphql`
  query DevelopPage {
    directorys: allDirectory(
      filter: {
        sourceInstanceName: { eq: "develop" }
        relativeDirectory: { regex: "/^$|^\\.\\.$/" }
      }
      sort: { order: DESC, fields: relativeDirectory }
    ) {
      nodes {
        id
        name
      }
    }
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "develop" }
        absolutePath: { regex: "/.md$/" }
      }
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        sourceInstanceName
        childMarkdownRemark {
          frontmatter {
            date(formatString: "MMMM DD , YYYY")
            title
          }
          fields {
            slug
          }
          excerpt(truncate: true)
          id
        }
      }
    }
  }
`
