export const rAFthrottle = function (cb) {
  let tick = false
  return function trigger() {
    if (tick) {
      return
    }
    tick = true
    return requestAnimationFrame(function task() {
      tick = false
      return cb()
    })
  }
}
