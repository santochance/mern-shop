'use strict';

var braintree = require('braintree');
// var config = require('../../config/environment');
// var isProduction = config.env === 'production';


/* 临时创建config */
var config = {
  braintree: {
    clientID:       process.env.BRAINTREE_ID || 'id',
    clientSecret:   process.env.BRAINTREE_SECRET || 'secret',
    clientMerchant: process.env.BRAINTREE_MERCHANT || 'merchant'
  }
}
/* 临时设置为false */
var isProduction = false


var gateway = braintree.connect({
  environment: isProduction ? braintree.Environment.Production : braintree.Environment.Sandbox,
  merchantId: config.braintree.clientMerchant,
  publicKey: config.braintree.clientID,
  privateKey: config.braintree.clientSecret
});

module.exports = gateway;
