import React from 'react'
import { useFolderName } from '../../hooks/'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { Container } from '../../components/container'
import { PostThumbnails } from '../../components/post-thumbnails'
import { Title } from '../../components/title'
import { PageDescription } from '../../components/page-description'
import { capitalize } from '../../utils/capitalize'
import './index.scss'

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
      <Container>
        <Title title={'👨‍💻 ' + pageName} />
        <PageDescription title={pageName} description={description} />
        <PostThumbnails posts={posts} />
      </Container>
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
      limit: 5
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date
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
