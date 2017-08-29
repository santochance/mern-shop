var specProps = [
  {
    name: 'brand',
    ctrlType: 'select',
    values: ['苹果', '三星', '华为', '魅族', '小米', 'OPPO', '其他']
  },
  {
    name: 'cpu',
    ctrlType: 'select',
    values: ['高通', '联发科', '海思', '德州仪器', '苹果', '三星', '英特尔', '不详', '其他']
  },
  { name: 'model' },
  { name: 'ram' },
  { name: 'monitorSize' },
  { name: 'batteryCapacity' },
  {
    name: 'additiveFeature',
    ctrlType: 'checkbox',
  },
  { name: 'resolution' },
  {
    name: 'listingDate',
    ctrlType: 'date'
  },
]

var basicProps = [
  { name: 'productName' },
  {
    name: 'images',
    ctrlType: 'file'
  },
  {
    name: 'amount',
    ctrlType: 'number'
  },
  {
    name: 'price',
    ctrlType: 'number'
  },
  {
    name: 'discount',
    ctrlType: 'number'
  },
  {
    name: 'shipping',
    ctrlType: 'number'
  },
  {
    name: 'location',
    // select-group怎样实现？
    ctrlType: 'text'
  },
]

specProps.map((prop) => {
  prop.catalog = 'phone'
  prop.propType = 'spec'
})

basicProps.map((prop) => {
  prop.catalog = 'phone'
  prop.propType = 'basic'
})

var props = specProps.concat(basicProps)

const sendData = (data) => {
    // sendData
    return fetch('/properties', {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res)
        }
      })
      // .catch(console.error)
}

// 使用异步序列发送数据
props.reduce((promise, prop) =>
  promise.then(() => sendData(prop))
, Promise.resolve())
  .then(() => console.log('All data is sended.'))
  .catch(console.error)


// let promise = Promise()
// for (let prop of props) {
//   promise = promise.then(() => sendData(prop))
// }
