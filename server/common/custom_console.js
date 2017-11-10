'use strict'

let debug = {
  log: true,
  info: true,
  warn: true,
  error: true,
}

function wrapper(type) {
  return function(...args) {
    debug && debug[type] && console[type](...args)
  }
}

let methods = ['log', 'info', 'error', 'warn'].reduce((method, key) =>
  Object.assign(method, { [key]: wrapper(key) })
  , {})

methods.config = ({ debug: _debug }) => {
  debug = _debug
}

module.exports = {
  ...methods
}
