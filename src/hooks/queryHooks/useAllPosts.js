import { graphql, useStaticQuery } from 'gatsby'

const useAllPosts = () => {
  return useStaticQuery(graphql`
    query AllPosts {
      allFile(
        filter: { absolutePath: { regex: "/.md$/" } }
        sort: {
          fields: childrenMarkdownRemark___frontmatter___period
          order: DESC
        }
      ) {
        nodes {
          relativeDirectory
          childMarkdownRemark {
            frontmatter {
              slug
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
  `).allFile.nodes
}

export { useAllPosts }
