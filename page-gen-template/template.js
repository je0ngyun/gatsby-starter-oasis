import React from 'react'
import { useFolderName } from '../../hooks/'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { Container } from '../../components/container'
import { PostItems } from '../../components/post-items'
import { Title } from '../../components/title'
import { PageDescription } from '../../components/page-description'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

export default ({ data }) => {
  const pageName = capitalize('PN#####')
  const posts = data.posts.nodes
  const directorys = data.directorys.nodes
  const folderName = useFolderName()
  const description = 'DS#####'

  return (
    <Layout pageName={pageName}>
      <Seo title={pageName} description={description} />
      <Sidebar directorys={directorys} currentCatName={folderName} />
      <Container>
        <Title title={'👨‍💻 ' + pageName} />
        <PageDescription title={pageName} description={description} />
        <PostItems posts={posts} />
      </Container>
    </Layout>
  )
}

export const qurey = graphql`
  query PN#####Page {
    directorys: allDirectory(
      filter: { sourceInstanceName: { eq: "PN#####" } }
      sort: { order: ASC, fields: birthtime }
    ) {
      nodes {
        id
        name
      }
    }
    posts: allFile(
      filter: { sourceInstanceName: { eq: "PN#####" } }
      sort: { fields: childrenMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date(formatString: "MMMM DD , YYYY")
            slug
            stack
            title
          }
          excerpt(truncate: true)
          id
        }
      }
    }
  }
`
