import { graphql, useStaticQuery } from 'gatsby'

const useAllPosts = () => {
  return useStaticQuery(graphql`
    query AllPosts {
      allFile(
        filter: {
          absolutePath: { regex: "/.md$/" }
          sourceInstanceName: { nin: "index" }
        }
        sort: {
          fields: childrenMarkdownRemark___frontmatter___date
          order: DESC
        }
      ) {
        nodes {
          sourceInstanceName
          childMarkdownRemark {
            excerpt(truncate: true)
            frontmatter {
              date(formatString: "MMMM DD , YYYY")
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
//
