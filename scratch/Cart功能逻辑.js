// Cart 功能逻辑

// 创建 Cart 对象
// 一个App内只有一个Cart实例，而且只初始化一次。

// 初始化 Cart 数据


// 创建 Cart 新项目

let cart = createEntry([], 'orders')

addToCart(product, count = 1) {
  // 迭代cart的orders搜索product
  cart.orders.forEach((order) => {
    return (order.seller._id === product.seller._id) ? (
      // 存在product所属seller的order, 迭代items
      order.items.forEach((item) => {
        return (item.product.id === product._id) ? (
          // 调整item的数量
          // item.adjustBy(count)
          item.count += count
        ) : (
          // 创建新的item
          // order.items.push(createItem(product, count))
          addItem(order, createItem(product, count))
        )
      })
    ) : (
      // 不存在order，创建新的order
      // cart.orders.push(createOrder(product, count))
      addOrder(cart, createOrder(product, count))
    )
  })
}

/*
  createOrder()
  createItem()
  addItem(order, ...) // 这个要来做什么？？
  removeItem(order, item)

  itemIndex: [...items]

  createItem(product, count = 1) {
    let { price, discount, shipping } = product
    return {
      product,
      count,
      // price: price * count,
      // discount: discount * count,
      // shipping shipping * count,
      // total: (price + discount - shipping) * count,
      ...attrSum(Array(count).fill(product))
      checked: false
    }
  }

  createOrder(product, count = 1) {
    let items = createItem(product, count)
    return {
      seller: product.seller,
      items,
      count: items.length,
      ...attrSum(items),
      checked: false
    }
  }
*/

createOrder(product, count=1) {
  let order = createEntry(createItem(product, count), 'items')
  order.seller = product.seller
  return order
}

createItem(product, count = 1) {
  return createEntry(Array(count).fill(product), 'product')
}

createEntry(content, contentKey = 'content') {
  return {
    children: content,
    [contentKey]: content,
    count: content.length
    ...attrSum(content),
    checked: false
  }
}

addOrder(cart, order) {
  addEntry(cart, order)
}

addItem(order, item) {
  addEntry(order, item)
}

addEntry(parent, entry) {
  entry.parent = parent
  parent.children.push(entry)
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

removeItem(index, items) {
  items.splice(index, 1)
}



/********************************************/

createOrder(items, count) {
  return {
    items,
    count,
    price:
    discount
  }

  items.groupBy('seller')
}


groupBy(items, field) {
  // 最小一个组，最多items.length个组
  groups: {

  }
  // groups = [
  //   [],   filter
  //   [],   container
  // ]
  let groups = [[], []]
  item.forEach((item, i) => {
    let value = item[field]
    for (let group of groups) {
      if (value === group[0]) {
        group[1].push(value)
        var found = true
        break;
      }
    }
    if (found) groups.push(value, [value])
  })
}

groupBy(items, field) {
  let groups = []
  item.forEach((item, i) => {
    let filter = item[field]
    groups.some((group) => {
      group[0] === filter && group[1].push(item)
    }) || groups.push(filter, item)
  })

  return groups.map(group => (
    {
      [field]: group[0],
      items: group[1]
    }
  ))
}

groupBy(items, field) {
  let groups = []
  let rst = []
  item.forEach((item,, i) => {
    let filter = item[field]
    groups.some((group, j) => {
      group === filter && rst[i].items.push(item)
    }) || (
      group.push(filter),
      rst.push({ [field]: group, items: item })
    )
  })
}



items = [
  {
    product: { seller: '' }
  },
  {
    product: { seller: '' }
  },
]

orders = [
  {
    seller: '',
    items: []
  },
  {
    seller: '',
    items: []
  },
]



[filter, pointer]

pointer.items.push(item)

rst.push(item)
group[1].push


/********************************************************cart
  orders
    items


addOrder(order) {
  order.parent = orders
  order.childen = order.items
}


addEntry(parent, entry) {
  parent[alias]
  parent.children.push(order)
  enrty.parent = parent
}

addItem(order, item)
addOrder(cart, order, alias)



insertAfter(parent, node)


addOrder(parent, order)


cart = {
  order: []
}

cart = createEntry(cart, [], 'orders')

{
  parent:
  children
}


cart orders items

rst.children = content
rst.parent =

{
  content: []
  children: this.content
  checked...
  parent: this
}


new Item(children, alias) {
  this.children = this.[alias] = children
  this.parent = this
}

class CheckItem {
  constructor(content, alias='content') {
    this[alias] = this.children = content
    this.parent = this
    this.count
    this.
    this.checked = false
  }
}

class Cart {}


class Order {}

class Item {}

*/
