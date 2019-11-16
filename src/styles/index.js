import { createGlobalStyle } from 'styled-components'

export const darkColor = ({ theme }) => (`color: ${theme.isDark ? 'rgba(255,255,255, 0.8)' : 'rgba(0,0,0, 0.6)'};`)
export const headingDarkColor = ({ theme }) => (`color: ${theme.isDark ? 'rgb(255,255,255)' : 'rgb(0,0,0)'};`)
export const darkBG = ({ theme }) => (`background-color: ${theme.isDark ? 'black' : 'white'};`)

const GlobalStyle = createGlobalStyle`
  body {
    ${darkColor}
    ${darkBG}
    padding: 0;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${headingDarkColor}
  }





  /**
    Modify third party components class styles below
    Don't modify your component here
    for example .drawer-content-wrapper {
      your style here
    }
  */

 .drawer-content-wrapper {
    ${darkColor}
    ${darkBG}
    box-shadow: ${({ theme }) => theme.isDark ? '2px 0 8px rgba(255, 255, 255, 0.15) !important' : undefined};
  }
  .drawer-mask {
    background:  ${({ theme }) => theme.isDark ? 'white !important' : undefined};
  }
`

GlobalStyle.Arabic = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=El+Messiri&display=swap');
    @font-face {
    font-family: 'TheSans Bold';
    src: url('/fonts/the-sans/TheSans-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  /**
  *
  ** Fonts for Arabic Pages
  *
  */
  html[dir=rtl] {
    font-family: 'Almarai', sans-serif;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'TheSans Bold', sans-serif;
    }
  }
`

export default GlobalStyle;