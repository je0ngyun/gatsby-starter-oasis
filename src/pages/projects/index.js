import React from 'react'
import PropTypes from 'prop-types'
import { useFolderName } from '../../hooks/'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { ProjectList } from '../../components/project-list'
import { PageDescription } from '../../components/page-description'
import { PageTitle } from '../../components/page-title'
import { capitalize } from '../../utils/capitalize'

const Projects = ({ data }) => {
  const pageName = capitalize('Projects')
  const projects = data.posts.nodes
  const directorys = data.directorys.nodes
  const folderName = useFolderName()
  const description =
    'The major projects that have been carried out so far are sorted in order of recent development.'

  return (
    <Layout pageName={pageName}>
      <Seo title={pageName} description={description} />
      <Sidebar directorys={directorys} currentCatName={folderName} />
      <PageTitle title={pageName} />
      <PageDescription title={pageName} description={description} />
      <ProjectList projects={projects} />
    </Layout>
  )
}

Projects.propTypes = {
  data: PropTypes.object,
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
      filter: {
        sourceInstanceName: { eq: "projects" }
        absolutePath: { regex: "/.md$/" }
      }
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
