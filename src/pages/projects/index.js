import React from 'react'
import { useFolderName } from '../../hooks/'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { ProjectList } from '../../components/project-list'
import { Title } from '../../components/title'
import { PageDescription } from '../../components/page-description'

const Projects = ({ data }) => {
  const pageName = 'Projects'
  const projects = data.posts.nodes
  const directorys = data.directorys.nodes
  const folderName = useFolderName()
  const description =
    '현재까지 진행된 주요 프로젝트로 최근 개발순으로 정렬되어있습니다.'

  return (
    <Layout pageName={pageName}>
      <Seo title={pageName} description={description} />
      <Sidebar directorys={directorys} currentCatName={folderName} />
      <Title title={'💻 ' + pageName} />
      <PageDescription title={pageName} description={description} />
      <ProjectList projects={projects} />
    </Layout>
  )
}

export default Projects
export const qurey = graphql`
  query ProjectPage {
    directorys: allDirectory(
      filter: { sourceInstanceName: { eq: "projects" } }
      sort: { order: ASC, fields: birthtime }
    ) {
      nodes {
        id
        name
      }
    }
    posts: allFile(
      filter: { sourceInstanceName: { eq: "projects" } }
      sort: {
        fields: childrenMarkdownRemark___frontmatter___period
        order: DESC
      }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            slug
            stack
            title
            tags
            tech
            desc
            period
          }
          id
        }
      }
    }
  }
`
