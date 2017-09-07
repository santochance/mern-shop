'use strict'

var all = {}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign(
  all,
  require('./' + (process.env.NODE_ENV || 'dev') + '.js') || {}
)
