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
    var updated = Object.assign(entity, updates)
    /*
      spread()会导致以下错误的出现，api没有正确的server response，但不影响数据存入mongoDB
      TypeError: expecting an array or an iterable object but got [object Null]
          at C:\Users\Vincent\Data\Workspace\quick-react-app\node_modules\mongoose\lib\model.js:3822:16
          at C:\Users\Vincent\Data\Workspace\quick-react-app\node_modules\mongoose\lib\services\model\applyHooks.js:162:20
          at _combinedTickCallback (internal/process/next_tick.js:131:7)
          at process._tickCallback (internal/process/next_tick.js:180:9) 500
     */

    return updated.saveAsync()
      // .spread(function(updated) {
      //   return updated
      // })
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
  Product.findAsync(req.query)
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.read = function(req, res) {
  console.log('read product')
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
  console.log('fields:', req.body)
  console.log('upload files:', req.files)
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
    .then(handleSearchResult({
      ...req.query,
      term: req.params.term,
    }))
    .then(respondWithResult(res))
    .catch(handleError(res))
}

function handleSearchResult(query) {
  let { term, size, index = 1 } = query
  return function (result) {
    // 如果没有size, 或size为0, 不使用分组
    if (!size) return result
    let splitedRst = splitArray(result, size)

    // 自动修正index
    let total = splitedRst.length
    index = index > 0
      ? index < total
        ? index
        : total
      : 1

    return {
      page: {
        term,
        size,
        index,
        total,
      },
      content: splitedRst[index - 1]
    }
  }
}

function splitArray(arr, size) {
  let count = Math.ceil(arr.length / size)
  console.log('count:', count)
  let rst = []

  while (count--) {
    rst.unshift(arr.slice(count * size, (count + 1) * size))
  }

  return rst
}
