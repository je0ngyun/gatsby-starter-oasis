import React from 'react'
import PropTypes from 'prop-types'
import { useTopLvFolderName } from '../../hooks/'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { PostItems } from '../../components/post-items'
import { PageDescription } from '../../components/page-description'
import { PageTitle } from '../../components/page-title'
import { capitalize } from '../../utils/capitalize'

const Develop = ({ data }) => {
  const pageName = capitalize('develop')
  const posts = data.posts.nodes
  const directorys = data.directorys.nodes
  const folderName = useTopLvFolderName()
  const description =
    'It contains posts about concepts and troubleshooting processes required during development.'

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

Develop.propTypes = {
  data: PropTypes.object,
}

export default Develop

export const qurey = graphql`
  query DevelopPage {
    directorys: allDirectory(
      filter: {
        sourceInstanceName: { eq: "develop" }
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
        sourceInstanceName: { eq: "develop" }
        absolutePath: { regex: "/.md$/" }
      }
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        relativeDirectory
        childMarkdownRemark {
          frontmatter {
            date(formatString: "MMMM DD , YYYY")
            slug
            title
          }
          excerpt(truncate: true)
          id
        }
      }
    }
  }
`
