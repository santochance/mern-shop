'use strict'

var all = {}

// Export the config object based on the NODE_ENV
// ==============================================

let env = process.env.NODE_ENV || 'dev'
console.log('NODE_ENV is:', env)

module.exports = Object.assign(
  all,
  require(`./${env}.js`) || {}
)
