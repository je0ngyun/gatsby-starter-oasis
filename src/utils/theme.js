const getElement = (selector) => document.querySelector(selector)
const addClass = (element, className) => element.classList.add(className)
const removeClass = (element, className) => element.classList.remove(className)
const hasClass = (element, className) => element.classList.contains(className)

const getBody = () => getElement('body')
const addClassToBody = (className) => addClass(getBody(), className)
const removeClassToBody = (className) => removeClass(getBody(), className)
const hasClassOfBody = (className) => hasClass(getBody(), className)

const ModeStateLight = function () {
  this.task = function () {
    removeClassToBody('light')
    addClassToBody('dark')
    localStorage.setItem('theme', 'dark')
  }
  this.toggle = function (modeSwitch) {
    this.task()
    modeSwitch.setState(new ModeStateDark())
  }
}

const ModeStateDark = function () {
  this.task = function () {
    removeClassToBody('dark')
    addClassToBody('light')
    localStorage.setItem('theme', 'light')
  }
  this.toggle = function (modeSwitch) {
    this.task()
    modeSwitch.setState(new ModeStateLight())
  }
}

const THEME = {
  light: ModeStateLight,
  dark: ModeStateDark,
}

const ModeSwitch = (function () {
  let theme = hasClassOfBody('light') ? 'light' : 'dark'
  let modeState = new THEME[theme]()

  if (localStorage.getItem('theme') !== theme) {
    modeState.task()
    theme = localStorage.getItem('theme')
    modeState = new THEME[theme]()
  }

  return function () {
    this.setState = function (_modeState) {
      modeState = _modeState
    }
    this.onSwitch = function () {
      modeState.toggle(this)
    }
    this.isLight = function () {
      return hasClassOfBody('light')
    }
  }
})()

const ThemeManager = new ModeSwitch()
export { ThemeManager }
