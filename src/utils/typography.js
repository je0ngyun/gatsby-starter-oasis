import Typography from 'typography'
import GitHubTheme from 'typography-theme-github'

const googleFonts = [
  {
    name: 'Roboto Mono',
    styles: ['400', '500'],
  },
  {
    name: 'Noto Sans Korean',
    styles: ['400', '500'],
  },
  {
    name: 'Catamaran',
    styles: ['500', '700'],
  },
]

const baseFontSize = '18px'
const baseFontFamily = ['Noto Sans Korean']

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
      fontFamily: 'Catamaran',
      border: `none`,
    },

    h2: {
      fontWeight: 700,
      lineHeight: 1.3,
      fontFamily: 'Catamaran',
      marginTop: '50px',
      marginBottom: '20px',
      border: `none`,
    },
  }
}
const typography = new Typography(GitHubTheme)
typography.options.googleFonts.push(...googleFonts)
typography.options.baseFontSize = baseFontSize
typography.options.headerFontFamily.unshift(...baseFontFamily)
typography.options.bodyFontFamily.unshift(...baseFontFamily)

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
