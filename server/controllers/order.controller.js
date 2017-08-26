/**
  * GET ...
  *
  *
  */

'use strict'

const Order = require('../models/order.model')

function handleError(res, statusCode=500) {
  return function(err) {
    console.error(err, statusCode)
    res.status(statusCode).send(err)
  }
};

function respondWithResult(res, statusCode=200) {
  return function(entity) {
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
    var updated = Object.assign({}, entity, updates)
    return updated.saveAsync()
      .spread(function(updated){
        return updated
      })
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

exports.create = function(req, res) {
  Catalog.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

exports.list = function(req, res) {
  Order.find().sort({_id: 1})
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
    .then(responseWithResult(res))
    .catch(handleError(res))
}

exports.delete = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}
