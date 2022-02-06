import Typography from 'typography'
import GitHubTheme from 'typography-theme-github'

const googleFonts = [
  {
    name: 'Do Hyeon',
    styles: ['400', '500', '600', '700'],
  },
  {
    name: 'Montserrat',
    styles: ['400', '500', '600', '700'],
  },
]

GitHubTheme.overrideThemeStyles = () => {
  return {
    a: {
      boxShadow: `none`,
      textDecoration: `none`,
      color: `#0687f0`,
    },

    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
      textDecoration: `none`,
    },

    'a:hover': {
      textDecoration: `none`,
    },

    h1: {
      fontWeight: 700,
      lineHeight: 1.3,
      marginTop: '50px',
      fontFamily: 'Montserrat',
      border: `none`,
    },

    h2: {
      fontWeight: 700,
      lineHeight: 1.3,
      fontFamily: 'Montserrat',
      marginTop: '50px',
      marginBottom: '20px',
      border: `none`,
    },
  }
}
const typography = new Typography(GitHubTheme)
typography.options.googleFonts.push(...googleFonts)
typography.options.baseFontSize = '18px'

console.log(typography)

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
