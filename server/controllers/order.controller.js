/**
  * GET ...
  *
  *
  */

'use strict'

const Order = require('../models/order.model')
const User = require('../models/user.server.model')
const Product = require('../models/product.model')

function handleError(res, statusCode = 500) {
  return function(err) {
    console.error(err, statusCode)
    res.status(statusCode).send(err)
  }
};

function respondWithResult(res, statusCode = 200) {
  return function(entity) {
    // console.log('response entity:', JSON.stringify(entity, null, 2))
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }

}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = Object.assign(entity, updates)
    return updated.saveAsync()
    /* 下面代码有bug, 目前还没解决，详见product.controller.js */
    // return updated.saveAsync()
    //   .spread(function(updated) {
    //     return updated
    //   })
  }
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end()
        })
    }
  }
}

// api
// ---

exports.create = function(req, res) {
  // req.body是一个orders数组
  let mongoose = User.base
  let orders = req.body

  // 如果不是数组，转换为数组
  if (!Array.isArray(orders)) orders = [orders]

  orders.map(order => {
    // 使用当前登录用户作为订单的buyer
    order.buyer = new mongoose.Types.ObjectId(req.user._id)
    order.seller = new mongoose.Types.ObjectId(order.seller)
    order.items = order.items.map(item =>
      Object.assign(item, {
        // 测试文件中使用item.product存放_id
        content: new mongoose.Types.ObjectId(item.content._id || item.product)
      })
    )
    return order
  })
  Order.createAsync(orders)
    .then(orders => orders.map(order => order._id))
    .then(ids =>
      // 创建后立即查询
      // 注意不能直接把数组作为find()的参数
      // 要使用`{_id: []}`的格式构造传入参数
      Order.find({ _id: ids })
        .populate('buyer')
        .populate('items.content')
    )
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

exports.list = function(req, res) {
  let mongoose = User.base
  // 查询当前登录用户的订单
  Order.find({buyer: new mongoose.Types.ObjectId(req.user._id)})
    .sort({_id: -1})
    .populate('buyer')
    .populate('items.content')
    .execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.read = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.delete = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}

// 订单支付api
exports.pay = function(req, res) {
  console.log('paying...')
  let payments = req.body
  Promise.all(payments.map(p => (
    Order.findByIdAsync(p._id)
      // 此外save()返回Promise
      .then(order => Object.assign(order, p, { status: 'paid' }).save())
      .then(order => { console.log(order); return order })
  )))
    .then(respondWithResult(res))
    .catch(handleError(res))
}
