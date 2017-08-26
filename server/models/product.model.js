'use strict'

const mongoose = require('bluebird').promisifyAll(require('mongoose'))
const Schema = mongoose.Schema

var ProductSchema = new Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1 },
  description: String,
  imageBin: { data: Buffer, contentType: String },
  imageUrl: String,
  album: [{ type: String }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Catalog', index: true }],

  name: String,
  ccc_serial_number: String,
  size: String,
  color: String,
  brand: String,
  model: String,
  ram: String,
  cpu: String,
  /*
    shipping: { type: Number, min: 0 },
    sales: { type: Number, min: 0 },
    brand: String,
    serial_number: Number,
    published_at: Date,

    category: Array | Stirng,
    photo: Array | String,

    size: Array | String,
    color: Array | String,
    meterial: Array | String,

    details: Buffer,
    comments: Array
  */
}).index({
  /* `Product.find({ $text: { $search: req.params.term }})` */
  /* 如果没有正确创建index，会报错：text index required for $text query */
  'title': 'text',
  'description': 'text'
})

module.exports = mongoose.model('Product', ProductSchema)
