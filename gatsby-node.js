const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const allFileEdges = await graphql(`
    query AllFile {
      allFile(
        sort: {
          order: [ASC, DESC]
          fields: [sourceInstanceName, childMarkdownRemark___frontmatter___date]
        }
      ) {
        edges {
          next {
            childMarkdownRemark {
              frontmatter {
                slug
                stack
                title
              }
            }
            sourceInstanceName
          }
          node {
            childMarkdownRemark {
              frontmatter {
                slug
                stack
              }
            }
            sourceInstanceName
          }
          previous {
            childMarkdownRemark {
              frontmatter {
                slug
                stack
                title
              }
            }
            sourceInstanceName
          }
        }
      }
    }
  `).then((query) => query.data.allFile.edges);

  const allPostData = allFileEdges
    .filter((edge) => edge.node.childMarkdownRemark)
    .map((edge) => {
      let { previous, node, next } = edge;
      const curSrcInsName = node.sourceInstanceName;
      if (previous?.sourceInstanceName !== curSrcInsName) previous = null;
      if (next?.sourceInstanceName !== curSrcInsName) next = null;
      return {
        previous: previous && { ...previous?.childMarkdownRemark.frontmatter },
        current: { ...node.childMarkdownRemark.frontmatter },
        next: next && { ...next?.childMarkdownRemark.frontmatter },
        curSrcInsName: curSrcInsName,
      };
    });

  allPostData.forEach((data) => {
    const { previous, current, next, curSrcInsName } = data;
    actions.createPage({
      path: `/${current.stack}/${current.slug}`,
      component: path.resolve('./src/templates/index.js'),
      context: {
        slug: current.slug,
        stack: current.stack,
        curSrcInsName: curSrcInsName,
        previous: previous,
        next: next,
      },
    });
  });
};
