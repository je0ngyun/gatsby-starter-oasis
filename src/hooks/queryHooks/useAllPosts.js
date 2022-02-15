import { graphql, useStaticQuery } from 'gatsby'

const useAllPosts = () => {
  return useStaticQuery(graphql`
    query AllPosts {
      allFile(
        filter: { absolutePath: { regex: "/.md$/" } }
        sort: {
          order: [ASC, DESC, DESC]
          fields: [
            childrenMarkdownRemark___fields___slug
            childrenMarkdownRemark___frontmatter___period
            childMarkdownRemark___frontmatter___date
          ]
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
  `).allFile.nodes
}

export { useAllPosts }
