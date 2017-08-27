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

/*******************************/

function addItem(order, product, count) {
  return addEntry(
    order,
    createEntry('product', product, count)
  )
}

function addOrder(cart, product, count) {
  return addEntry(
    cart,
    addEntry(
      createEntry('items'),
      createEntry('product', product, count)
    )
  )
}

function createEntry(key, content = [], count = 0) {
  let rst = {
    [key]: content,
    count: count.length || count,
    checked: false
  }

  rst[Array.isArray(content) ? 'children' : 'child'] = content

  return aggregate(rst)
}

function aggregate(entry) {
  let rst = {price: 0, discount: 0, shipping: 0, total: 0}
  if (entry.children) {
    // 如果是'cart', 'order'
    entry.children.reduce((sum, item) => {
      sum.price += item.price
      sum.discount += item.discount
      sum.shipping += item.shipping
      sum.total = sum.price - sum.discount + sum.shipping
      return sum
    }, rst)
  } else {
    // 如果是'item'
    // count的变化是根据调用addToCart(product, count)的第二参数决定
    rst.price += entry.child.price * entry.count
  }
  return Object.assign(entry, rst)
}

function addEntry(parent, entry) {
  if (parent) {
    entry.parent = parent
    parent.count = parent.children.push(entry)

    updateItem(parent)

    return parent
  }
}

function updateItem(item, count) {
  // `item`可以是Cart, Order, Item中的任一
  let curr = item
  let prev = curr
  do {
    aggregate(curr)
    prev = curr
    curr = curr.parent
  } while (curr)

  item.child && count && (item.count = count)

  // 更新cart.count
  prev.count = countItem(prev)
}

function countItem(entry, countSum = 0) {
  // 如果children不存在或为空，返回0
  if (!entry.children.length) return 0

  // 这里假设children不为空时，children[0]肯定不为undefined

  // 如果entry是order级
  if (entry.children[0].child) {
    return entry.children.length
  }

  // 否则遍历entry.children，对每一元素递归调用countItem()
  return entry.children.reduce((count, e) => {
    // console.log('count in reduce is %s now', count)
    return (count += countItem(e, count))
  }, countSum)
}

/********************************/
/* 测试 */

// const rdProd = () => (
//   {
//     price: random(10),
//     discount: 3,
//     shipping: 5
//   }
// )

// //
//   // console.log('============= test for createEntry =============')
//   // console.log('cart:\n', createEntry('orders'))
//   // console.log('order:\n', createEntry('items'))
//   // console.log('item:\n', createEntry('product', rdProd(), random(5)))

//   // console.log('============= test for addItem =================')
//   // var order = createEntry('items')
//   // var n = random(5)
//   // while (n--) {
//   //   addItem(order, rdProd(), random(5))
//   // }
//   // console.log('order:\n', order)

//   // console.log('============= test for addOrder =================')
//   // var cart = createEntry('orders')
//   // var n = random(5)
//   // while (n--) {
//   //   addOrder(cart, rdProd(), random(5))
//   // }
//   // console.log('cart:\n', cart)

// console.log('========== test for countItem ==============')

// var cart2 = createEntry('orders')
// let i = random(5)
// while (i--) {
//   let order = createEntry('items')

//   let j = random(5)
//   while (j--) {
//     // console.log('(i, j) --> (%s, %s)', i, j)

//     addItem(order, rdProd(), random(5))
//   }
//   addEntry(cart2, order)
// }

// console.log('cart:\n', cart2)

module.exports = {
  addItem,
  addOrder,
  addEntry,
  createEntry,
  aggregate,
  updateItem,
  countItem,
}
