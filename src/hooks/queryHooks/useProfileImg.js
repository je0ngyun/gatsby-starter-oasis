import { graphql, useStaticQuery } from 'gatsby'

const useProfileImg = () => {
  return useStaticQuery(graphql`
    query ProfileImg {
      file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          gatsbyImageData(width: 70)
        }
      }
    }
  `).file.childImageSharp.gatsbyImageData
}

export { useProfileImg }
