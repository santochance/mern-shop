'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
  catalog: {
    type: Schema.Types.ObjectId,
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
    default: 'spec'
    required: true,
  },
  // 如果不指定schema，字段会被保存吗?
  // schemaCfg: {
  //   // 怎样指定接受''或{}
  //   // 使用validate?

  //   type: {},
  //   // required: true,
  // },
  control: {
    ctrlType: {
      type: String,
      enum: ['text', 'textarea', 'checkbox', 'select', 'number', 'data'],
      default: 'text',
    },
    values: {
      type: [],
      default: undefined,
    }
  },
}).index({
  'catalog': 1,
  'name': 1,
})

// PropertySchema.pre('save', function (next) {
//    let values = this.control.values
//    if (values && value.length > 0) {
//      this.schema.enum = values
//    }

      // next()
// })

module.exports = mongoose.model('Property', PropertySchema)


