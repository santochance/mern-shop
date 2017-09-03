export function addToCart (product, amount = 1) {
    let cart = this.state
    // let { updateItem, createItem, createList, appendItem } = this

    // 遍历寻找所属order
    cart.children.some(order => {
      // 找到所属order
      if (order.seller === product.seller) {

        // 遍历寻找所属item
        order.children.some(item => {
          // 找到所属item
          if (item.content._id === product._id) {
            this.updateItem(item, item.amount + amount)
            return true
          }
        }) || (
          // 没找到所属item
          this.appendItem(order, this.createItem(product, amount))
        )

        return true
      }
    }) || (
      // 没找到所属order
      this.appendItem(cart, this.appendItem(this.createList(), this.createItem(product, amount)))
    )

    console.log('cart:\n', cart)
  }

export function createItem (content, amount) {
  return {
    ident: 'Item',
    content,
    amount,
    count: 1,
    price: content.price * amount || 0,
    shipping: content.shipping * amount || 0,
    discount: content.discount * amount || 0,
    realPay: (content.price - content.discount + content.shipping) * amount || 0,
    parent: null,
    checked: false,
  }
}

export function createList () {
  return {
    ident: 'Order',
    count: 0,
    price: 0,
    parent: null,
    children: [],
    checked: false
  }
}

export function createListByCont (content, amount) {
  this.createList().append(this.createItem(content, amount))
}

export function appendItem (list, item) {
  // 连接list和item
  item.parent = list
  // 插入item到list
  list.children.push(item)

  this.updateChecked(item)

  // 从list开始往上迭代计算count
  // 往上迭代计算aggregate
  this.countUpwards(list)

  this.setState({...this.state})

  return list
}

export function countUpwards (entry) {
  while (entry) {
    Object.assign(entry, entry.children.reduce((sum, child) => {
      // 如果entry是leaf item, 根据checked进行筛选
      if ('children' in child || child.checked) {
        sum.count += (child.count || 0)
        sum.price += (child.price || 0)
        sum.discount += (child.discount || 0)
        sum.shipping += (child.shipping || 0)
        sum.realPay += (child.realPay || 0)
      }

      // !!!! 记得要返回值  !!!!!
      return sum
    }, {count: 0, price: 0, discount: 0, shipping: 0, realPay: 0}))

    entry = entry.parent
  }
}

export function removeItem (item, index) {
  console.log('remove item', item)
  let list = item.parent
  list.children.splice(index, 1)

  // 自动清除空的list
  if (list.children.length < 1) {
    this.destory(list)
  }

  this.updateChecked(item)

  this.countUpwards(list)

  this.setState({...this.state})
}

export function clearItems (list) {
  list.children.splice(0)

  this.destory(list)

  list.checked = false
  this.updateChecked(list)

  this.countUpwards(list)

  this.setState({...this.state})
}

// 自动清除空list
export function destory (item) {
  let parent = item.parent
  parent && parent.children.splice(parent.children.indexOf(item), 1)
}

export function updateItem (item, amount) {
  item.amount = amount
  // 更新amount后触发更新item aggregation
  item.price = item.content.price * amount
  // 同时要更新祖先的aggregation和count
  // ...

  // this.refresh()
  this.countUpwards(item.parent)
  this.setState({...this.state})
}

export function aggregate () {

}

export function check (item) {
  item.checked = !item.checked
  this.updateChecked(item)

  this.countUpwards(item.parent)

  this.setState({...this.state})
}

export function updateChecked (item) {
  let parent = item.parent
  let children = item.children

  while (parent) {
    // parent.checked = parent.children.every((child) => child.checked)
    parent.checked = parent.children.length > 0 ? parent.children.every((child) => child.checked) : false
    parent = parent.parent
  }

  export function recur(entries) {
    entries.forEach((entry) => {
      entry.checked = item.checked
      entry.children && recur(entry.children)
    })
  }

  children && recur(children)
}

export function outputData (itemlist) {
  console.log('this in outputData:', this)
  let rst = []
  for (let list of itemlist.children) {
    // 跳过没有选中项的list
    if (list.count < 0) continue
    let filteredList = {...list, children: []}

    for (let [index, item] of list.children.entries()) {
      if (item.checked) {
        // 发现被勾选的item
        filteredList.children.push(item)
        this.removeItem(item, index)
      }
    }

    // 添加公共属性
    Object.assign(filteredList, {
      buyer: 'buyer from itemlist',
      address: 'address from itemlist',
      realPay: filteredList.total,
    })

    // 存入输出结果
    rst.push(filteredList)
  }

  // 发送数据
  return rst.reduce((arr, data) => {
    // fetch()
    console.log('send data:', data)
    return arr
  }, rst)
}


class extends class App extends Cart)


(Foo) => class extends Foo

() => class extends ((Foo) => class extends Foo)


class (class extends Base1 extends Base2


class Bar extends Super
