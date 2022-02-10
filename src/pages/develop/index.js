import React from 'react'
import { useFolderName } from '../../hooks/'
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
  const folderName = useFolderName()
  const description =
    '개발을 하면서 필요하다고 생각하는 개념 및 문제 해결과정에 대한 글을 담고 있습니다.'

  return (
    <Layout pageName={pageName}>
      <Seo title={pageName} description={description} />
      <Sidebar directorys={directorys} currentCatName={folderName} />
      <PageTitle title={pageName} />
      <PageDescription title={pageName} description={description} />
      <PostItems posts={posts} />
    </Layout>
  )
}

export default Develop

export const qurey = graphql`
  query DevelopPage {
    directorys: allDirectory(
      filter: { sourceInstanceName: { eq: "develop" } }
      sort: { order: ASC, fields: birthtime }
    ) {
      nodes {
        id
        name
      }
    }
    posts: allFile(
      filter: { sourceInstanceName: { eq: "develop" } }
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
