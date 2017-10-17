import _ from 'lodash'

let products = Array(_.random(10)).fill().map((p, i) => ({
  _id: i,
  productName: 'Brand/品牌 {类目}-{型号}-{名称}',
  description: '{商品描述}',
  price: _.random(10, 10000),
  stock: _.random(10, 100),
  shipping: _.random(5, 20),
  imageUrl: '/01.jpg',
}))

let makeItem = () => {
  let content = products[0]
  let amount = _.random(3, 10)

  return {
    content,
    amount,
    price: content.price * amount,
    shipping: content.shipping * amount,
    checked: false,
  }
}

let item = makeItem()

let items = Array(_.random(1, 5)).fill().map((item, i) => makeItem())

let orders = [
  {
    children: items,
    price: 0,
    count: 0,
    checked: false,
  }
]

let cart = {
  children: orders,
  price: 0,
  count: 0,
  checked: false,
}

let cartAPI = {
  removeItem () { console.log('删除商品') }
}

export {
  items, orders, cart, cartAPI
}
