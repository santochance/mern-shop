'use strict'

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
// 支付模块相关model
var Braintree = require('../braintree/braintree.model');

var OrderDetailsSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  total: { type: Number, get: getPrice, set: setPrice }
});

var OrderSchema = new Schema({
  // shippingAddress: String,
  // billingAddress: String,

  // buyer details
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  address: {
    name: String,
    tel: String,
    addr: String,
  },
  items: [OrderDetailsSchema],
  // seller details
  shopName: String,
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  // price details
  price: { type: Number, get: getPrice, set: setPrice },
  discount: { type: Number, get: getPrice, set: setPrice, default: 0.0 },
  shipping: { type: Number, get: getPrice, set: setPrice, default: 0.0 },
  total: { type: Number, required: true, get: getPrice, set: setPrice },
  paymentStatus: Schema.Types.Mixed,
  paymentType: { type: String, default: 'braintree' },
  nonce: String,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'paid', 'delivered', 'finish', 'canceled', 'refunded']
  }, // pending, paid/failed, delivered, canceled, refunded.
  created: { type: Number, default: Date.now }
});

// execute payment
OrderSchema.pre('validate', function (next) {
  if(!this.nonce) { return next(); }
  executePayment(this, function (err, result) {
    this.paymentStatus = result;
    if(err || !result.success){
      this.status = 'failed. ' + result.errors + err;
      next(err || result.errors);
    } else {
      this.status = 'paid';
      next();
    }
  }.bind(this));
});

function executePayment(payment, cb){
  Braintree.transaction.sale({
    amount: payment.total,
    paymentMethodNonce: payment.nonce,
  }, cb);
}

function getPrice(num){
    return parseFloat((num/100).toFixed(2));
}


// Q: `num * 100`是为了处理小数误差问题？
function setPrice(num){
    return num * 100;
}

module.exports = mongoose.model('Order', OrderSchema);
