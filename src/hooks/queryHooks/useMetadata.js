import { graphql, useStaticQuery } from 'gatsby'

const useMetadata = () => {
  return useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          title
          slug
          description
          author
          copyright
          siteUrl
          menu
          commentRepo
          googleVerification
          naverVerification
        }
      }
    }
  `).site.siteMetadata
}

export { useMetadata }
