'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var Catalog = require('../models/catalog.model.js')

var PropertySchema = new Schema({
  catalog: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: 'Catalog',
    required: true,
    // index: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  propType: {
    type: String,
    enum: ['basic', 'spec', 'sale'],
    default: 'spec',
    required: true,
  },
  ctrlType: {
    type: String,
    enum: ['text', 'textarea', 'checkbox', 'select', 'number', 'date', 'file'],
    default: 'text',
  },
  values: {
    type: [],
    default: undefined,
  },
  required: {
    type: Boolean,
    default: false,
  }
}).index({
  'catalog': 1,
  'name': 1,
}, {
  unique: true,
  dropDups: true
})

PropertySchema.pre('validate', function (next) {
  console.log('### Pre of validate')
  console.log('this:', this)
  next()
})
// PropertySchema.pre('save', function (next) {
//   // let values = this.control.values
//   // if (values && value.length > 0) {
//   //  this.schema.enum = values
//   // }
//   console.log('### Pre of save')
//   console.log('`this` in pre save:', this)
//   // console.log('type of this:', this.constructor.name)
//   // let name = this.populate('catalog')
//   // console.log('name return:', name)
//   let entry = Catalog.find({name: 'phone'})
//   console.log('entry:', entry)

// })

module.exports = mongoose.model('Property', PropertySchema)
