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
const uploadOptions = { autoFile: true, uploadDir: 'public/uploads' }

module.exports = function(app) {
  app.get('/', (req, res, next) => {
    let username = req.user && req.user.username ? ', ' + req.user.username : ''
    res.send(`<h1>Welcome to Express${username}!</h1>`)
  })

  app.route('/users')
    .post(users.create)
    .get(users.list)

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
      var rst
      res.json(rst = { id: req.user._id, username: req.user.username })
      console.log(rst)
    })

  app.get('/signout', users.signout)

  // routes for products
  app.route('/products')
    .post(products.create)
    .get(products.list)

  app.route('/products/:id')
    .get(products.read)
    .put(products.update)
    .patch(products.update)
    .delete(products.delete)

  app.post('/products/:id/upload', multiparty(uploadOptions), products.upload)

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
