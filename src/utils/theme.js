const getElement = (selector) => document.querySelector(selector)
const addClass = (element, className) => element.classList.add(className)
const removeClass = (element, className) => element.classList.remove(className)
const hasClass = (element, className) => element.classList.contains(className)

const getBody = () => getElement('body')
const addClassToBody = (className) => addClass(getBody(), className)
const removeClassToBody = (className) => removeClass(getBody(), className)
const hasClassOfBody = (className) => hasClass(getBody(), className)

const ModeStateLight = function () {
  this.toggle = function (modeSwitch) {
    console.log('From Light to Dark')
    removeClassToBody('light')
    addClassToBody('dark')
    modeSwitch.setState(new ModeStateDark())
  }
}

const ModeStateDark = function () {
  this.toggle = function (modeSwitch) {
    console.log('From Dark to Light')
    removeClassToBody('dark')
    addClassToBody('light')
    modeSwitch.setState(new ModeStateLight())
  }
}

const ModeSwitch = (function () {
  let modeState = hasClassOfBody('light')
    ? new ModeStateLight()
    : new ModeStateDark()
  return function () {
    this.setState = function (_modeState) {
      modeState = _modeState
    }
    this.onSwitch = function () {
      console.log(modeState)
      modeState.toggle(this)
    }
  }
})()

const ThemeManager = new ModeSwitch()
export { ThemeManager }
