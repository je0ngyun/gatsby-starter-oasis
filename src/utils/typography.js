import Typography from 'typography'
import GitHubTheme from 'typography-theme-github'

const baseFontSize = '18px'

GitHubTheme.overrideThemeStyles = () => {
  return {
    body: {
      'font-family': `Pretendard, -apple-system, BlinkMacSystemFont,
      'Apple SD Gothic Neo', Roboto, 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic',
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`,
    },

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
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: 'Catamaran, Pretendard',
      border: `none`,
    },

    h2: {
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: 'Catamaran, Pretendard',
      marginTop: '50px',
      marginBottom: '20px',
      border: `none`,
    },

    h3: { fontSize: `1.3rem` },
  }
}
const typography = new Typography(GitHubTheme)

/*  Google Fonts can be added here. */
/* 
const googleFonts = [
  {
    name: 'Roboto Mono',
    styles: ['400', '500'],
  },
  {
    name: 'Catamaran',
    styles: ['500', '700'],
  },
]

//font query suffix
googleFonts[googleFonts.length - 1].styles.push(
  googleFonts[googleFonts.length - 1].styles.pop() + `&display=swap`
)

typography.options.googleFonts.push(...googleFonts)
*/

typography.options.baseFontSize = baseFontSize

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
