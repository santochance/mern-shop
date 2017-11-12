'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan') // HTTP request logger middleware for node.js
const compress = require('compression') // Compress a HTTP message
const methodOverride = require('method-override') // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const path = require('path')

const notice = (req, res, next) => {
  console.log('\n%s--request %s %s', new Date().toISOString().slice(2, 18), req.method, req.url)
  // 测试session
  // console.log('session:', JSON.stringify(req.session, null, 2))
  // console.log('current authed user:', req.user && req.user.username)
  next()
}

module.exports = function() {
  const app = express()

  // 开启CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

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
    cookie: { maxAge: 3600000 },
  }))
  // app.set('views', './app/views')
  // app.set('view engine', 'ejs')

  app.use(flash())

  // It is responsible for bootstrapping the Passport module
  app.use(passport.initialize())
  // It is using the Express session to keep track of your user's session
  app.use(passport.session())

  require('../server.routes.js')(app)

  // 注意static路径是相对于运行server.js文件的package.json
  // 如果需要相对于当前执行脚本的路径，请使用__dirname
  app.use(express.static(path.join(__dirname, '../public')))

  return app
}
