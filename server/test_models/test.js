'use strict'

let db = require('../config/mongoose.js')()

let Schema = db.base.Schema

var Property = require('../models/property.model.js')
// var Product = require('../models/product.model');
var Catalog = require('../models/catalog.model');
// var product, catalog

var phone
Catalog.create({name: 'phone'})
  .then(catalog => {
    console.log('catalog:', catalog)
    phone = catalog._id

    console.log('type of phone:', phone.constructor.name)

    var property = Property.create(
      {
        catalog: phone,
        func: {pathType: 'string'},
        name: 'cpu' + Date.now,
        schemaCfg: {
          type: String,
          required: false,
        },
        control: {
          ctrlType: 'checkbox',
          values: ['cpu1', 'cpu2', 'cpu3'],
        },
      }
    )
  })

// console.log('type of phone:', phone.constructor.name)

// {
//   name: 'catalog',
//   schemaCfg: {
//     type: String,
//     ref: 'Catalog'
//   }
// },

// 创建类目属性Collection

// 查询类目属性对象
// let schema = Property.find({'catalog': 'phone'}, ['schema'])

// let Phone = mongoose.Model('phone', new Schema(schema)
// console.log(property)

// var phone = new Phone({})


// 取出property
// 获取schemaCfg
// 根据schemaCfg创建schema
