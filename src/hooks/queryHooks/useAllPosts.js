import { graphql, useStaticQuery } from 'gatsby'

const useAllPosts = () => {
  return useStaticQuery(graphql`
    query AllPosts {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            title
            stack
            slug
            date
            desc
            tags
            tech
          }
          id
          excerpt(pruneLength: 100, truncate: true)
        }
      }
    }
  `).allMarkdownRemark.nodes
}

export { useAllPosts }
