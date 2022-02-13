const path = require('path')

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
                slug
                title
              }
            }
            sourceInstanceName
            relativeDirectory
          }
          node {
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
            sourceInstanceName
            relativeDirectory
          }
          previous {
            childMarkdownRemark {
              frontmatter {
                slug
                title
              }
            }
            sourceInstanceName
            relativeDirectory
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
        relativeDirectory: previous.relativeDirectory,
      },
      current: {
        ...node.childMarkdownRemark.frontmatter,
        sourceInstanceName: node.sourceInstanceName,
        relativeDirectory: node.relativeDirectory,
      },
      next: next && {
        ...next.childMarkdownRemark.frontmatter,
        relativeDirectory: next.relativeDirectory,
      },
    }
  })

  allPostData.forEach((data) => {
    const { previous, current, next } = data
    actions.createPage({
      path: `/${current.relativeDirectory}/${current.slug}`,
      component: path.resolve('./src/templates/index.js'),
      context: {
        slug: current.slug,
        curSrcInsName: current.sourceInstanceName,
        previous: previous,
        next: next,
      },
    })
  })
}
