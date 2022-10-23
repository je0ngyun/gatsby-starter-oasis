const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const allFileEdges = await graphql(`
    query AllFile {
      allFile(
        sort: {
          order: [ASC, DESC]
          fields: [sourceInstanceName, childMarkdownRemark___frontmatter___date]
        }
        filter: { absolutePath: { regex: "/.md$/" } }
      ) {
        edges {
          next {
            childMarkdownRemark {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
            sourceInstanceName
          }
          node {
            childMarkdownRemark {
              fields {
                slug
              }
            }
            sourceInstanceName
          }
          previous {
            childMarkdownRemark {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
            sourceInstanceName
          }
        }
      }
    }
  `).then((query) => query.data.allFile.edges)

  const allPostData = allFileEdges.map((edge) => {
    let { previous, node, next } = edge
    const curSrcInsName = node.sourceInstanceName
    if (previous?.sourceInstanceName !== curSrcInsName) previous = null
    if (next?.sourceInstanceName !== curSrcInsName) next = null

    return {
      previous: previous && {
        ...previous.childMarkdownRemark.frontmatter,
        ...previous.childMarkdownRemark.fields,
        sourceInstanceName: previous.sourceInstanceName,
      },
      current: {
        ...node.childMarkdownRemark.frontmatter,
        ...node.childMarkdownRemark.fields,
        sourceInstanceName: node.sourceInstanceName,
      },
      next: next && {
        ...next.childMarkdownRemark.frontmatter,
        ...next.childMarkdownRemark.fields,
        sourceInstanceName: next.sourceInstanceName,
      },
    }
  })

  allPostData.forEach((data) => {
    const { previous, current, next } = data
    actions.createPage({
      path: `/${current.sourceInstanceName}${current.slug}`,
      component: path.resolve('./src/templates/index.jsx'),
      context: {
        slug: current.slug,
        curSrcInsName: current.sourceInstanceName,
        previous: previous,
        next: next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
