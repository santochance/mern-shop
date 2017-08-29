'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan') // HTTP request logger middleware for node.js
const compress = require('compression') // Compress a HTTP message
const methodOverride = require('method-override') // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const notice = function (req, res, next) {
  console.log(`\n
############################################
          ${new Date().toISOString()}
            New Request Comes in!
############################################
    `)
  console.log('Request is:', req.constructor.name)
  console.log('############################################\n')
  next()
}

module.exports = function() {
  const app = express()

  app.use(notice)

  // Q: bodyParser.urlencoded() ??
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())

  app.use(methodOverride())

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'mern-shop-dev-session-secret'
  }))
  // app.set('views', './app/views')
  // app.set('view engine', 'ejs')

  app.use(flash())

  // It is responsible for bootstrapping the Passport module
  app.use(passport.initialize())
  // It is using the Express session to keep track of your user's session
  app.use(passport.session())

  require('../server.routes.js')(app)

  app.use(express.static('./public'))

  return app
}
