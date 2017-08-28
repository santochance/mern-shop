/**
 * GET
 * POST
 *...
 */
'use strict'
/*
// model.js 是使用有输出形式还是没输出形式？ #question
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
*/

const path = require('path')
const Product = require('../models/product.model')
const Catalog = require('../models/catalog.model')

function handleError(res, statusCode = 500) {
  return function(err) {
    console.error(err, statusCode)
    res.status(statusCode).send(err)
  }
};

function respondWithResult(res, statusCode = 200) {
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

function saveFile(res, file) {
  return function(entity) {
    var newPath = '/public/uploads/' + path.basename(file.path)
    entity.imageUrl = newPath
    return entity.saveAsync().spread(function(updated) {
      return updated
    })
  }
}

function productsInCategory(catalog) {
  var catalog_ids = [catalog._id].concat(catalog.children)
  return Product
    .find({ 'categories': { $in: catalog_ids } })
    .populate('categories')
    .exec();
}

exports.create = function(req, res) {
  Product.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

exports.list = function(req, res) {
  Product.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.read = function(req, res) {
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id
  }
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.delete = function(req, res) {
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}

// POST /products/:id/upload
// Uploads a new Product's image in the DB
exports.upload = function(req, res) {
  var file = req.files.file
  if (!file) {
    return handleError(res)('File not provided')
  }

  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveFile(res, file))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

// GET /products/:slug/catalog catalog
exports.catalog = function(req, res) {
  Catalog.findOne({ slug: req.params.slug })
    .execAsync()
    .then(productsInCategory)
    .then(respondWithResult(res))
    .catch(handleError)
}

// GET /products/:term/search  search
exports.search = function(req, res) {
  Product.find({ $text: { $search: req.params.term } })
    .populate('categories')
    .execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res))
}
