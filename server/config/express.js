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
  console.log('req:', req.constructor.name)
  console.log('req.method:', req.method)
  console.log('req.url:', req.url)
  console.log('req.headers:', req.headers)
  console.log('req.body:\n', JSON.stringify(req.body, null, 2).slice(0, 2000))
  console.log('############################################\n')
  next()
}

module.exports = function() {
  const app = express()

  // Q: bodyParser.urlencoded() ??
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())

  app.use(notice)

  app.use(methodOverride())

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'mern-shop-dev-session-secret',
    cookie: { maxAge: 60000 },
  }))
  // app.set('views', './app/views')
  // app.set('view engine', 'ejs')

  app.use(flash())

  // It is responsible for bootstrapping the Passport module
  app.use(passport.initialize())
  // It is using the Express session to keep track of your user's session
  app.use(passport.session())

  // 测试session
  app.use(function(req, res, next) {
    // debugger
    console.log('session:', JSON.stringify(req.session, null, 2))
    console.log('current authed user:', req.user && req.user.username)
    next()
  })

  require('../server.routes.js')(app)

  app.use(express.static('./public'))

  return app
}
