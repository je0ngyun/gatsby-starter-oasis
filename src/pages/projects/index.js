import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../../components/layout'
import { Seo } from '../../components/seo'
import { Sidebar } from '../../components/sidebar'
import { ProjectList } from '../../components/project-list'
import { PageDescription } from '../../components/page-description'
import { PageTitle } from '../../components/page-title'
import { capitalize } from '../../utils/capitalize'
import { useTopLevelPathName } from '../../hooks'

const Projects = ({ data }) => {
  const topLevelPathName = useTopLevelPathName()
  const pageName = capitalize(topLevelPathName)
  const projects = data.posts.nodes
  const directorys = data.directorys.nodes
  const description =
    'The major projects that have been carried out so far are sorted in order of recent development.'

  return (
    <Layout belongs={topLevelPathName}>
      <Seo title={pageName} />
      <Sidebar directorys={directorys} currentCatName={topLevelPathName} />
      <PageTitle title={pageName} />
      <PageDescription description={description} />
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
      filter: {
        sourceInstanceName: { eq: "projects" }
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
        sourceInstanceName: { eq: "projects" }
        absolutePath: { regex: "/.md$/" }
      }
      sort: {
        fields: childrenMarkdownRemark___frontmatter___period
        order: DESC
      }
    ) {
      nodes {
        sourceInstanceName
        childMarkdownRemark {
          frontmatter {
            title
            tags
            tech
            desc
            period
          }
          fields {
            slug
          }
          id
        }
      }
    }
  }
`
