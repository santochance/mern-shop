// require User Model
const users = require('./user.server.controller')
const products = require('./controllers/product.controller')
const catalogs = require('./controllers/catalog.controller')
const orders = require('./controllers/order.controller')

const crud = require('./controllers/crud.js')
// const products = crud(require('./controllers/product.controller'))
const properties = crud(require('./models/property.model.js'))

const passport = require('passport')

const multiparty = require('connect-multiparty')
// const multiparty = require('multiparty')
const uploadOptions = {
  autoFile: true,
  // uploadDir: 'public/uploads'
}

module.exports = function(app) {
  app.get('/', (req, res, next) => {
    let username = req.user && req.user.username ? ', ' + req.user.username : ''
    res.send(`<h1>Welcome to Express${username}!</h1>`)
  })

  app.route('/users')
    .post(users.create)
    .get(users.list)

  app.route('/users/logined')
    .get(users.getLogined)

  app.route('/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete)

  // 这里什么意思？ #Q
  // app.param()用于注册 route parameter callback
  // 当route path出现注册了callback的route parameter时，相应的callback就会被触发
  // 详细请查阅[app.param()](https://expressjs.com/en/api.html#app.param)
  app.param('userId', users.userById)

  app.route('/api/signup')
    .get(users.renderSignup)
    .post(users.signup)

  app.route('/api/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      // successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }), function(req, res) {
      // 这里的user是一个mongoose的Model实例
      var rst = Object.assign({}, req.user._doc)
      delete rst.password
      delete rst.salt
      console.log('send login responese:', rst)

      // 返回整个user对象
      // 去掉password和salt字段
      res.json(rst)
      // res.json(rst = { id: req.user._id, username: req.user.username })
    })

  app.get('/signout', users.signout)

  // routes for products
  app.route('/products')
    .post(multiparty(uploadOptions), products.create)
    .get(products.list)

  app.get('/products/homeData', products.getHomeData)

  app.route('/products/:id')
    .get(products.read)
    .put(multiparty(uploadOptions), products.update)
    .patch(products.update)
    .delete(products.delete)

  // app.post('/products/:id/upload', multiparty(uploadOptions), products.upload)

  app.post('/products/upload', multiparty(uploadOptions), products.upload)

  app.get('/products/:slug/catalog', products.catalog)
  app.get('/products/:term/search', products.search)

  // routes for catalogs
  app.route('/catalogs')
    .post(catalogs.create)
    .get(catalogs.list)

  app.route('/catalogs/:id')
    .get(catalogs.read)
    .put(catalogs.update)
    .patch(catalogs.update)
    .delete(catalogs.delete)

  // routes for orders
  app.route('/orders')
    .post(orders.create)
    .get(orders.list)

  app.route('/orders/:id')
    .get(orders.read)
    .put(orders.update)
    .patch(orders.update)
    .delete(orders.delete)
  app.route('/orders/pay')
    .post(orders.pay)

  function registerRoutes(app, model, controller) {
    app.route(`/${model}`)
      .post(controller.create)
      .get(controller.list)

    app.route(`/${model}/:id`)
      .get(controller.read)
      .put(controller.update)
      .patch(controller.update)
      .delete(controller.delete)
  }
  // registerRoutes(app, 'products', products)
  registerRoutes(app, 'properties', properties)

  app.get('/test', function (req, res, next) {
    console.log('hit /test')
    console.log('query is:', req.query)
    res.send('hit')
  })

  app.get('/test/query?', function (req, res, next) {
    console.log('hit /test/query?')
  })
}
