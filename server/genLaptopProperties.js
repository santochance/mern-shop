var specProps = [
  {
    name: 'brand',
    label: '品牌',
    ctrlType: 'select',
    required: true,
    values: ['苹果', '惠普', '华硕', '宏碁', '联想', '其他'],
  },
  {
    name: 'cpu',
    label: 'CPU',
    ctrlType: 'text',
    required: true,
    values: ['高通', '联发科', '海思', '德州仪器', '苹果', '三星', '英特尔', '不详', '其他'],
  },
  {
    name: 'model',
    label: '型号',
    required: true,
  },
  {
    name: 'ram',
    label: '内存容量',
    required: true,
  },
  {
    name: 'monitorSize',
    label: '屏幕尺寸',
    required: true,
  },
  {
    name: 'resolution',
    label: '分辨率',
  },
  {
    name: 'listingDate',
    label: '上市日期',
    ctrlType: 'date',
  },
]

var basicProps = [
  {
    name: 'productName',
    label: '商品名称',
  },
  {
    name: 'images',
    label: '商品图片',
    ctrlType: 'file',
  },
  {
    name: 'amount',
    label: '数量',
    ctrlType: 'number',
  },
  {
    name: 'price',
    label: '价格',
    ctrlType: 'number',
  },
  {
    name: 'discount',
    label: '折扣',
    ctrlType: 'number',
  },
  {
    name: 'shipping',
    label: '运费',
    ctrlType: 'number',
  },
  {
    name: 'location',
    // select-group怎样实现？
    label: '所在地',
    ctrlType: 'text',
  },
]

specProps.map((prop) => {
  prop.catalog = 'laptop'
  prop.propType = 'spec'
})

basicProps.map((prop) => {
  prop.catalog = 'laptop'
  prop.propType = 'basic'
})

var props = specProps.concat(basicProps)

const sendData = (data) => {

    // sendData
    return fetch('/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      // .then(res => {
      //   if (res.ok) {
      //     return res.json()
      //   } else {
      //     return Promise.reject(res)
      //   }
      // })
      .then(res => res.json())
      // .catch(console.error)
}

// 使用异步序列发送数据
props.reduce((promise, prop) =>
  promise.then(() => sendData(prop))
, Promise.resolve())
  .then(() => console.log('All data is sended.'))
  .catch(console.error)
