let addrs = Array.from({length: 3}).map((item, i) =>
  ({
    name: `黄先生 (${i})`,
    addr: '广东省 深圳市 ...',
    tel: '138****7697'
  })
)

function random(min, max, base = 1, withMax = true) {
  let _min, _max
  if (arguments.length < 2) {
    _max = min
    _min = base
  } else {
    _max = max
    _min = min
  }

  return Math.floor(Math.random() * (_max - _min + (withMax ? 1 : 0)) + _min)
}

function attrSum(entries) {
  return entries.reduce((sum, entry) => {
    sum.price += entry.price
    sum.discount += entry.discount
    sum.shipping += entry.shipping
    sum.total = sum.price - sum.discount + sum.shipping
    return sum
  }, {price: 0, discount: 0, shipping: 0, total: 0})
}

let orders = Array(3).fill().map((order, i) => {

  let items = Array(random(2, 4)).fill().map((item, j) => {

    let product = {
      name: `product (${i}, ${j})`,
      price: random(20),
      discount: 0,
      shipping: random(8),
    }
    let amount = random(5)

    let sum = attrSum(Array(amount).fill(product))

    return {
      product,
      amount,
      ...sum,
      checked: false,
    }
  })

  return {
    seller: `Seller (${i})`,
    message: `Message (${i}) ${Date.now()}`,
    items,
    amount: items.length,
    ...attrSum(items),
    checked: false,
  }
})

/*
console.log(JSON.stringify(addrs, null, 2))
console.log(JSON.stringify(orders, null, 2))
*/

module.exports.addrs = addrs
module.exports.orders = orders
