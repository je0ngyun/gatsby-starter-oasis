import { graphql, useStaticQuery } from 'gatsby'

const useAllPosts = () => {
  return useStaticQuery(graphql`
    query AllPosts {
      allFile(
        filter: { absolutePath: { regex: "/.md$/" } }
        sort: {
          fields: childrenMarkdownRemark___frontmatter___date
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
  `).allFile.nodes
}

export { useAllPosts }
