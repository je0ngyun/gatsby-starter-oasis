import { graphql, useStaticQuery } from 'gatsby'

const useMetadata = () => {
  return useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          title
          description
          author
          copyright
          siteUrl
          menu
          commentRepo
          otherSite
          googleVerification
          naverVerification
        }
      }
    }
  `).site.siteMetadata
}

export { useMetadata }
