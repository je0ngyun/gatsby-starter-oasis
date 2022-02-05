import { useState, useEffect } from 'react'
import * as Dom from '../../utils/dom'

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
}

function flagToThemeName(flag) {
  return flag ? THEME.DARK : THEME.LIGHT
}

function themeNameToFlag(themeName) {
  return themeName === THEME.DARK ? true : false
}

function setTheme(themeFlag) {
  if (themeFlag) {
    Dom.addClassToBody(THEME.DARK)
    Dom.removeClassToBody(THEME.LIGHT)
  } else {
    Dom.addClassToBody(THEME.LIGHT)
    Dom.removeClassToBody(THEME.DARK)
  }
}

const useTheme = () => {
  const [themeFlag, setThemeFlag] = useState(false)

  useEffect(() => {
    const stgTheme = localStorage.getItem('theme')
    if (stgTheme) {
      setThemeFlag(themeNameToFlag(stgTheme))
      setTheme(themeNameToFlag(stgTheme))
    }
  }, [])

  const toggleTheme = function (themeFlag) {
    const themeName = flagToThemeName(themeFlag)
    localStorage.setItem('theme', themeName)
    setThemeFlag(themeFlag)
    setTheme(themeFlag)
  }

  return [themeFlag, toggleTheme]
}

export { useTheme }
