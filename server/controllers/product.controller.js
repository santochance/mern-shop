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
const fs = require('fs')
const Product = require('../models/product.model')
const Catalog = require('../models/catalog.model')
const uploadDir = path.resolve(__dirname, '../../public/uploads/products')
const saveImgs = require('../../src/helper/saveUploadedImages.js')
const homeData = require('../homeData')
const _ = require('lodash')

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

function saveUploadedImages(images, dist) {
  return function(product) {
    images = Array.isArray(images) ? images : [images]
    // let imgPaths = images.['01.jpg', '02.jpg', '03.jpg']
    let imgPaths = images.map(img => img.path)
    let imgBasenames
    let newDir = path.join(dist, String(product._id))
    return saveImgs(imgPaths, newDir, imgBasenames)
      .then(album => Object.assign(product, { album }).saveAsync())
  }
}

// 商品详情页的图片路径生成
const schema = 'http://'
const imgHost = 'oyziwoiqy.bkt.clouddn.com/mernshop'

function getImgUrls(id) {
  const section = '/product'
  const dir = path.posix.join(imgHost, section, id)
  const img_sub = '/images'
  const parti_sub = '/paticulars'
  return function(product) {
    let smUrls = []
    let mdUrls = []
    let lgUrls = []

    // 商品图片bases
    let bases = product['imgUrls'] || []
    // 获取商品封面图片
    let coverUrl = schema + path.posix.join(dir, img_sub, bases[0]) + '?imageslim&imageView2/2/w/200'

    bases.forEach(base => {
      smUrls.push(schema + path.posix.join(dir, img_sub, base) + '?imageslim&imageView2/2/w/52')
      mdUrls.push(schema + path.posix.join(dir, img_sub, base) + '?imageslim')
      lgUrls.push(schema + path.posix.join(dir, img_sub, base) + '?imageslim')
    })

    let partiUrls
    // 商品详情图片bases
    let particulars = product['partiImgUrls'] || []
    partiUrls = particulars.map(dtBase => schema + path.posix.join(dir, parti_sub, dtbase) + '?imageslim')

    return Object.assign({}, product._doc, { smUrls, mdUrls, lgUrls, partiUrls, imageUrl: coverUrl })
  }
}

// 商品列表的封面图片路径生成
function getCoverUrls() {
  return function(products) {
    return products.map(product => (
      Object.assign({}, product._doc, {
        imageUrl: schema + path.posix.join(imgHost, 'product', product._id.toString(), 'images', product.imgUrls[0]) + '?imageslim&imageView2/2/w/200'
      })
    ))
  }
}

exports.create = function(req, res) {
  // 创建product数据
  // 查询获取product._id
  // 然后以此作为dirName保存files
  // console.log('req.files', req.files)
  let catalog_ids = req.body.categroies.map(cata => ({_id: Schema.Type.ObjectId(cata)}))

  Product.createAsync(req.body)
    // .then(product => {
    //  return Catalog.find({'_id': {$in: catalog_ids}})
    //     .then(categories => ({...product, categories}))
    // })
    .then(saveUploadedImages(req.files.images, uploadDir))
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

exports.list = function(req, res) {
  Product.findAsync(req.query)
    .then(getCoverUrls())
    .then(respondWithResult(res))
    .catch(handleError(res))
}

exports.read = function(req, res) {
  console.log('read product')
  Product.findByIdAsync(req.params.id)
    .then(getImgUrls(req.params.id))
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
    // .then(handleSearchResult({
    //   ...req.query,
    //   term: req.params.term,
    // }))
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

// 模拟获取首页数据api
exports.getHomeData = function(req, res) {
  console.log('hit: GET /products/homeData')
  // 替换floors内items数组的product_id字符串为数据实体
  Promise.all(homeData.floors.map(floor =>
    Product.find({ _id: floor.items })
      .then(getCoverUrls())
      .then(products => (floor.items = _.shuffle(products)))
  ))
    .then(() => homeData)
    .then(respondWithResult(res))
    .catch(handleError(res))
}
