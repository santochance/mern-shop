'use strict'

const mongoose = require('mongoose')

var dbURI = 'mongodb://localhost/mern'

module.exports = function() {
  // About [The `useMongoClient` Option](http://mongoosejs.com/docs/connections.html#use-mongo-client)
  // `useMongoClient`设置为true和false的返回类型是不相同的，前者返回NativeConnection, 后者返回Mongoose，前者可以通过NativeConnection.base访问Mongoose
  var db = mongoose.connect(dbURI, {
    useMongoClient: true
  })

  require('../models/user.server.model')
  require('../models/product.model')

  return db
}
