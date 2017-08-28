'use strict'

const Property = require('../models/property.model.js')

function handleError(res, statusCode = 500) {
  return function(err) {
    console.error(err, statusCode)
    res.status(statusCode).send(err)
  }
};

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
      .spread(function(updated) {
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

function respondWithResult(res, statusCode = 200) {
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }
}

exports.create = function(req, res) {
  Property.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

exports.list = function (req, res) {
  Property.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.read = function (req, res) {
  Property.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id
  }
  Property.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.delete = function (req, res) {
  Property.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}
