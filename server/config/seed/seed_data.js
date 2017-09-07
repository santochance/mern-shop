'use strict'

var values = [
  '2017款Apple/苹果 12 英寸 MacBook 256GB/512G,福利社10年老店， 诚信经营， 有着悠久历史的苹果福利社。 双皇冠 100% 全好评的店在淘宝上几乎没有了。您的满意是我们的追求 / 信用卡付款有1%手续费,10899,金,Apple/苹果,MacBook 256G,Apple/苹果 12 英寸 MacBook 256GB,12英寸,,Intel Core i5, 2015010902759212',
  'Apple/苹果 MacBook Air MQD32CH/A 国行13英寸MQD42笔记本电脑,,5899,D32,Apple/苹果,MacBook Air  MQD32CH/A,Apple/苹果 MacBook Air MQD32CH/A,13.3英寸,8GB,Inter 酷睿i5 5350U, 2015010902759212',
  'Asus/华硕 R RX310UA7100超薄13手提游戏轻薄便携学生笔记本电脑,13.3英寸IPS高分屏 全金属超极本,4199,石英灰,Asus/华硕,RX310UA7100,Asus/华硕 RX310UA7100,13.3英寸,4GB,英特尔 酷睿 i3-7100U,',
  'HP/惠普 Spectre x360 13-w021TU超薄13.3英寸触屏旋转笔记本电脑,七代i5 窄边框 CNC工艺,7999,星光银,HP/惠普,13-w021TU,HP/惠普 Spectre x360 13-w021TU,13.3英寸,8GB,英特尔 酷睿 i5-7200U,2016010902892080',
  'HP/惠普 spectre13 v115tu 超薄笔记本电脑商务游戏超极本,7代新品上市 商务超极本 游戏笔记本,7999,土豪金,HP/惠普,v115tu,HP/惠普 spectre13 v115tu,13.3英寸,8GB,英特尔 酷睿 i5-7200U,2016010902845330',
]

var fields = ['title', 'description', 'price', 'color', 'brand', 'model', 'name', 'size', 'ram', 'cpu', 'ccc_serial_number']

const data = (values
  .map(str => str.split(/\s*,\s*/))
  .map(val => fields.reduce((obj, f, i) => ({...obj, [f]: val[i]}), {}))
)

// require('./mongoose')()
// var Product = require('../models/product.model')
// Product.create(...data)

console.log(data)

module.exports.data = data
