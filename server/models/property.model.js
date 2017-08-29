'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var Catalog = require('../models/catalog.model.js')

var PropertySchema = new Schema({
  catalog: {
    // type: Schema.Types.ObjectId,
    type: {},
    validate: (v, cb) => {
      console.log('validate function exec...')
      console.log('v is:', v)
      return true
    },
    ref: 'Catalog',
    // index: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  propType: {
    type: String,
    enum: ['basic', 'spec', 'sale'],
    default: 'spec',
    required: true,
  },
  // 如果不指定schema，字段会被保存吗?
  // schemaCfg: {
  //   // 怎样指定接受''或{}
  //   // 使用validate?

  //   type: {},
  //   // required: true,
  // },
  ctrlType: {
    type: String,
    enum: ['text', 'textarea', 'checkbox', 'select', 'number', 'data'],
    default: 'text',
  },
  values: {
    type: [],
    default: undefined,
  }
  // control: {

  // },
}).index({
  'catalog': 1,
  'name': 1,
})

PropertySchema.pre('validate', function (next) {
  console.log('### Pre of validate')
  console.log('this:', this)
  // console.log('this.catalog', this.catalog)
  // console.log('after population:', this.populate('catalog'))
  next()
})
PropertySchema.pre('save', function (next) {
  // let values = this.control.values
  // if (values && value.length > 0) {
  //  this.schema.enum = values
  // }
  console.log('### Pre of save')
  console.log('`this` in pre save:', this)
  // console.log('type of this:', this.constructor.name)
  // let name = this.populate('catalog')
  // console.log('name return:', name)
  let entry = Catalog.find({name: 'phone'})
  console.log('entry:', entry)

})

module.exports = mongoose.model('Property', PropertySchema)


