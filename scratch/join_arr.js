// let arr1 = [
//   '5998453775b74b3810457b9f',
//   '5998453775b74b3810457ba0',
//   '5998453775b74b3810457b9e',
// ]

// let arr2 = [
//   {a: 1},
//   {a: 2},
//   {a: 3},
// ]

let arr1 = [
  '599846b6dc7fa139e04a7f43',
  '599846b6dc7fa139e04a7f44',
  '599846b6dc7fa139e04a7f45',
  '599846b6dc7fa139e04a7f46',
  '599846b6dc7fa139e04a7f47',
]

let arr2 = [
  { title: '2017款Apple/苹果 12 英寸 MacBook 256GB/512G',
      description: '福利社10年老店， 诚信经营， 有着悠久历史的苹果福利社。 双皇冠 100% 全好 评的店在淘宝上几乎没有了。您的满意是我们的追求 / 信用卡付款有1%手续费',
      price: '10899',
      color: '金',
      brand: 'Apple/苹果',
      model: 'MacBook 256G',
      name: 'Apple/苹果 12 英寸 MacBook 256GB',
      size: '12英寸',
      ram: '',
      cpu: 'Intel Core i5',
      ccc_serial_number: '2015010902759212' },
    { title: 'Apple/苹果 MacBook Air MQD32CH/A 国行13英寸MQD42笔记本电脑',
      description: '',
      price: '5899',
      color: 'D32',
      brand: 'Apple/苹果',
      model: 'MacBook Air  MQD32CH/A',
      name: 'Apple/苹果 MacBook Air MQD32CH/A',
      size: '13.3英寸',
      ram: '8GB',
      cpu: 'Inter 酷睿i5 5350U',
      ccc_serial_number: '2015010902759212' },
    { title: 'Asus/华硕 R RX310UA7100超薄13手提游戏轻薄便携学生笔记本电脑',
      description: '13.3英寸IPS高分屏 全金属超极本',
      price: '4199',
      color: '石英灰',
      brand: 'Asus/华硕',
      model: 'RX310UA7100',
      name: 'Asus/华硕 RX310UA7100',
      size: '13.3英寸',
      ram: '4GB',
      cpu: '英特尔 酷睿 i3-7100U',
      ccc_serial_number: '' },
    { title: 'HP/惠普 Spectre x360 13-w021TU超薄13.3英寸触屏旋转笔记本电脑',
      description: '七代i5 窄边框 CNC工艺',
      price: '7999',
      color: '星光银',
      brand: 'HP/惠普',
      model: '13-w021TU',
      name: 'HP/惠普 Spectre x360 13-w021TU',
      size: '13.3英寸',
      ram: '8GB',
      cpu: '英特尔 酷睿 i5-7200U',
      ccc_serial_number: '2016010902892080' },
    { title: 'HP/惠普 spectre13 v115tu 超薄笔记本电脑商务游戏超极本',
      description: '7代新品上市 商务超极本 游戏笔记本',
      price: '7999',
      color: '土豪金',
      brand: 'HP/惠普',
      model: 'v115tu',
      name: 'HP/惠普 spectre13 v115tu',
      size: '13.3英寸',
      ram: '8GB',
      cpu: '英特尔 酷睿 i5-7200U',
      ccc_serial_number: '2016010902845330' }
]
let joint = []
for (let [i, v1] of arr1.entries()) {
  let v2 = arr2[i]
  joint.push(`{"_id": ObjectId("${v1}")}, {\$set: ${JSON.stringify({...v2, "imageUrl": `/public/${v1}/01.jpg`})
    }}`)
}

module.exports.joint = joint

console.log(JSON.stringify(joint, null, 2))

