const debounce = function (fn, time) {
  let threshold
  let timeout
  return function (...args) {
    if (!threshold) {
      timeout = setTimeout(() => {fn.apply(this, args)}, time)
      threshold = new Date().getUTCMilliseconds() + time
      return
    }
    if (new Date().getUTCMilliseconds() > threshold) {
      timeout = setTimeout(() => {fn.apply(this, args)}, time)
      threshold = new Date().getUTCMilliseconds() + time
    }
    else {
      clearTimeout(timeout)
      timeout = setTimeout(() => {fn.apply(this, args)}, time)
      threshold = new Date().getUTCMilliseconds() + time
    }
  }
}

module.exports = debounce
