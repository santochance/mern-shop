import React from 'react'

/* 171014 未测试
  重新写了一个包含了向上遍历和向下遍历的函数
  把checked的修改逻辑也整合到求和对象中
  用使用类似redux的reducer的方式，在reduce中执行指定的回调

*/
function refreshNode(node, direction = 'all') {

  if (direction === 'down') {
    return downRecur(node)
  } else if (direction === 'up') {
    return upRecur(node)
  }
  downRecur(node)
  upRecur(node)

  // 向下
  function downRecur(node) {
    // 如果node没有children，从node自身取值
    if (!node.children) {
      return { price: 10, checked: false }
    }
    let rst = node.reduce((state, child) => {
      let rst = downRecur(child)
      // 修改节点值
      Object.assign(child, rst)
      return fn(state, rst)
    }, {})
    // 修改节点值
    Object.assign(node, downRecur(node))
  }

  // 向上
  function upRecur(node) {
    // 如果没有parent，直接返回
    let _parent = node.parent
    if (!_parent) return

    let rst = _parent.children.reduce((state, child) => {
      return fn(state, child)
    })
    Object.assign(_parent, rst)
    upRecur(_parent)
  }

  function fn(state, obj) {
    return ({
      price: state.price + obj.price,
      checked: state.checked && obj.checked,
    })
  }
}

function random(min, max, base = 0, withMax = false) {
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

class ItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemlist: {
        title: 'ItemList',
        parent: null,
        children: [],
        checked: false,
      },
    }
    this.check = this.check.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.outputData = this.outputData.bind(this)
    this.getCheckedItems = this.getCheckedItems.bind(this)
    this.getAllItems = this.getAllItems.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      // .then(products => this.setState({ ...this.state, products, prod: products, p: products  }))
      .then(products => this.setState({ ...this.state, products }))
      .then(() => setTimeout(() => this.makeList(), 200)) /* 产生模拟行为 */
      .catch(console.error)
  }

  makeList() {
    let { itemlist, products } = this.state
    // 创建一个list
    this.appendItem(itemlist, this.createList())

    // 在这个list中创建若干个内容, 数量随机的item
    let n = random(3, 6)
    while (n--) {
      this.appendItem(itemlist.children[0],
        this.createItem(products[random(products.length)],
          random(1, 6), true)
      )
    }

    // 更新state
    this.setState({...this.state})
  }

  outputData(itemlist) {
    console.log('this in outputData:', this)
    let rst = []
    let submitedItems = []
    for (let list of itemlist.children) {
      // 跳过没有选中项的list
      if (list.count < 0) continue
      let filteredList = {...list, items: []}
      delete filteredList.parent

      for (let [index, item] of list.children.entries()) {
        if (item.checked) {
          // 发现被勾选的item
          filteredList.items.push(item)
          // this.removeItem(item, index)
          submitedItems.push(item)
        }
      }

      // // 添加公共属性
      // Object.assign(filteredList, {
      //   buyer: 'buyer from itemlist',
      //   address: 'address from itemlist',
      //   realPay: filteredList.total,
      // })

      // 存入输出结果
      rst.push(filteredList)
    }

    console.log('submited items:', submitedItems)
    // 发送数据
    return rst.reduce((arr, data) => {
      // fetch()
      console.log('send data:', data)
      return arr
    }, rst)
  }

  // 通过"加入购物车"触发updateItem时，自动勾选item
  addToCart(product, amount = 1, checked = true) {
    let { cart } = this.state
    // let { updateItem, createItem, createList, appendItem } = this

    // 遍历寻找所属order
    cart.children.some(order => {
      // 找到所属order
      if (order.seller === product.seller) {

        // 遍历寻找所属item
        order.children.some(item => {
          // 找到所属item
          if (item.content._id === product._id) {
            this.updateItem(item, parseInt(item.amount) + parseInt(amount), checked)
            return true
          }
        }) || (
          // 没找到所属item
          this.appendItem(order, this.createItem(product, amount, checked))
        )

        return true
      }
    }) || (
      // 没找到所属order
      this.appendItem(cart, this.appendItem(this.createList(), this.createItem(product, amount, checked)))
    )

    console.log('cart:\n', cart)
  }

  createItem(content, amount, checked = false) {
    let { price = 0, discount = 0, shipping = 0 } = content
    return {
      content,
      title: 'Item',
      amount: amount,
      count: 1,
      price: price * amount || 0,
      discount: discount * amount || 0,
      shipping: shipping * amount || 0,
      realPay: (price - discount + shipping) * amount,
      parent: null,
      checked,
    }
  }

  createList(items) {
    return {
      title: 'Order',
      parent: null,
      children: [],
      checked: false,
    }
  }

  appendItem(list, item) {
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

  countUpwards(entry) {
    while (entry) {
      if (entry.children) {
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
      }
      entry = entry.parent
    }
  }

  countDownwards(entry) {
    if (!entry.children) {
      // 抽取entry的属性
      return ['count', 'price', 'discount', 'shipping', 'realPay'].reduce((rst, key) => {
        key in entry && (rst[key] = entry[key])
        return rst
      }, {})
    }

    let rst = entry.children.reduce((sum, child) => {
      // 如果child有children，即不是leaf
      // 或者是leaf, checked为true
      if ('children' in child || child.checked) {
        // 向下递归求和
        let childSum = this.countDownwards(child)
        // 把求和结果作为增量添加父对象的求和对象
        sum.count += (childSum.count || 0)
        sum.price += (childSum.price || 0)
        sum.discount += (childSum.discount || 0)
        sum.shipping += (childSum.shipping || 0)
        sum.realPay += (childSum.realPay || 0)
      }
      return sum
    }, {count: 0, price: 0, discount: 0, shipping: 0, realPay: 0})
    // 保存求和结果到当前entry

    Object.assign(entry, rst)
    return rst
  }

  aggregateDownwards(entry) {
    if (!entry.children) {
      // 抽取entry的属性
      return ['count', 'price', 'discount', 'shipping', 'realPay'].reduce((rst, key) => {
        key in entry && (rst[key] = entry[key])
        return rst
      }, {})
    }

    let rst = entry.reduce((sum, child) => {
      // 如果child有children，即不是leaf
      // 或者是leaf, checked为true
      if ('children' in child || child.checked) {
        // 向下递归求和
        let childSum = this.aggregateDownwards(child)
        // 保存求和结果到child
        Object(child, childSum)
        // 把求和结果作为增量添加父对象的求和对象
        this.objAdd(sum, childSum)
      }
      Object(entry, rst)
      return sum
    }, {count: 0, price: 0, discount: 0, shipping: 0, realPay: 0})
  }

  aggregateUpwards(entry) {
    let parent = entry.parent
    if (parent) {
      parent.children.reduce((sum, child) => {
        if ('children' in child || child.checked) {
          this.objAdd(sum, child)
        }
        return sum
      }, {count: 0, price: 0, discount: 0, shipping: 0, realPay: 0})
      this.aggregateUpwards(parent)
    }
  }

  objAdd(base, delta) {
    Object.keys(delta).reduce((obj, key) => {
      key in obj && (obj[key] += delta[key] || 0)
    }, base)
    return base
  }

  removeItem(item, index) {
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

  batchRemoveItems(items) {
    items.forEach(item => {
      // 求取index
      let parent = item.parent
      if (!parent) return // 根节点，直接返回

      function getIndex(target, array) {
        for (let [idx, item] of arr.entries()) {
          if (item === target) {
            return idx
          }
        }
        return -1
      }
      let arr = parent.children
      let index = getIndex(item, arr)
      // 如果没有找到index(通常不可能)
      if (index < 0) throw Error('没有找到index')

      // 调用removeItem删除元素
      this.removeItem(item, index)
    })
  }

  clearItems(list) {
    list.children.splice(0)

    this.destory(list)

    list.checked = false
    this.updateChecked(list)

    this.countUpwards(list)

    this.setState({...this.state})
  }

  // 自动清除空list
  destory(item) {
    let parent = item.parent
    parent && parent.children.splice(parent.children.indexOf(item), 1)
  }

  updateItem(item, amount, checked) {
    item.amount = amount
    if (checked !== undefined) {
      item.checked = checked
    }
    // 更新amount后触发更新item aggregation
    item.price = item.content.price * amount
    // 同时要更新祖先的aggregation和count
    // ...

    // this.refresh()
    this.countUpwards(item.parent)
    this.setState({...this.state})
  }

  check(item) {
    item.checked = !item.checked
    this.updateChecked(item)

    // debugger

    this.countDownwards(item)
    this.countUpwards(item)

    this.setState({...this.state})
  }

  updateChecked(item) {

    let parent = item.parent
    let children = item.children

    while (parent) {
      // parent.checked = parent.children.every((child) => child.checked)
      parent.checked = parent.children.length > 0 ? parent.children.every((child) => child.checked) : false
      parent = parent.parent
    }

    function recur(entries) {
      entries.forEach((entry) => {
        entry.checked = item.checked
        entry.children && recur(entry.children)
      })
    }

    children && recur(children)
  }

  getCheckedItems(itemlist) {
    // let checkedItems = []

    // function downRecur(node) {
    //   if (!node.children) {
    //     // 到达叶节点
    //     node.checked && checkedItems.push(node)
    //   }
    //   node.children.forEach(downRecur)
    // }
    // downRecur(rootNode)

    // 简化为基于确定的itemlist结构
    return itemlist.children.reduce((rst, order) =>
      rst.concat(order.children.filter(item => item.checked)),
    [])
  }
  getAllItems(itemlist) {
    return itemlist.children.reduce((rst, order) =>
      rst.concat(order.children),
    [])
  }

  render() {
    let { itemlist, products } = this.state

    let checkedItems

    return (
      <div className="itemlist">
        <div className="billboard" style={{
          position: 'fixed',
          zIndex: 2,
          top: '100px',
          right: '10px',
          width: '300px',
          outline: '1px solid black',
        }}>
          <div>Products Available</div>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>

        <div className="main">
          <input type="checkbox" name="" id="" checked={itemlist.checked} onChange={() => this.check(itemlist)}/>
          <button className="btn btn-default" onClick={
            () => this.appendItem(itemlist, this.createList())
          }>Create List</button>
          <span>Count: {itemlist.count}</span>{' '}
          <span>Price: {itemlist.price}</span>
          <div>
            <ul>
              {itemlist.children.map((list, i) => (
                <li key={i}>
                  <div>
                    <input type="checkbox" name="" id="" checked={list.checked} onChange={() => this.check(list)}/>
                    <button className="btn btn-info btn-xs" onClick={
                      () => this.appendItem(list, this.createItem(products[random(products.length)], random(1, 5)))
                    }>Create Item</button>
                    <button className="btn btn-danger btn-xs"
                      onClick={() => this.clearItems(list)}>Clear Items</button>
                    <button className="btn btn-default btn-sm" onClick={() => this.removeItem(list, i)}>Remove List</button>
                  </div>
                  <div>
                    <strong>{list.title} {i}</strong>{' '}
                    <span>Count: {list.count}, Price: {list.price}</span>
                  </div>
                  <ul>
                    {list.children.map((item, j) => (
                      <li key={j}>
                        <input type="checkbox" name="" id="" checked={item.checked} onChange={() => this.check(item)}/>
                        <button className="btn btn-danger btn-xs"
                          onClick={() => this.removeItem(item, j)}>Remove</button>
                        <span>{item.title} {j}: {item.content.title}</span>
                        <div>
                          Amount: {item.amount}{'  '}
                          <span><input type="number" min="1" value={item.amount} style={{
                              width: '50px'
                          }} onChange={(e) => this.updateItem(item, e.target.value || 1)}/></span>
                          <span>Price: {item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr/>
        <h3>只显示被勾选的叶对象, 有被勾选叶对象的list</h3>
        <div className="main">
          <input type="checkbox" name="" id="" checked={itemlist.checked} onChange={() => this.check(itemlist)}/>
          <button className="btn btn-default" onClick={
            () => this.appendItem(itemlist, this.createList())
          }>Create List</button>
          <span>Count: {itemlist.count}</span>{' '}
          <span>Price: {itemlist.price}</span>
          <div>
            <ul>
              {itemlist.children.map((list, i) => list.count > 0 && (
                <li key={i}>
                  <div>
                    <input type="checkbox" name="" id="" checked={list.checked} onChange={() => this.check(list)}/>
                    <button className="btn btn-info btn-xs" onClick={
                      () => this.appendItem(list, this.createItem(products[random(products.length)], random(1, 5)))
                    }>Create Item</button>
                    <button className="btn btn-danger btn-xs"
                      onClick={() => this.clearItems(list)}>Clear Items</button>
                    <button className="btn btn-default btn-sm" onClick={() => this.removeItem(list, i)}>Remove List</button>
                  </div>
                  <div>
                    <strong>{list.title} {i}</strong>{' '}
                    <span>Count: {list.count}, Price: {list.price}</span>
                  </div>
                  <ul>
                    {list.children.map((item, j) => item.checked && (
                      <li key={j}>
                        <input type="checkbox" name="" id="" checked={item.checked} onChange={() => this.check(item)}/>
                        <button className="btn btn-danger btn-xs"
                          onClick={() => this.removeItem(item, j)}>Remove</button>
                        <span>{item.title} {j}: {item.content.title}</span>
                        <div>
                          Amount: {item.amount}{'  '}
                          <span><input type="number" min="1" value={item.amount} style={{
                              width: '50px'
                          }} onChange={(e) => this.updateItem(item, e.target.value || 1)}/></span>
                          <span>Price: {item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div>测试获取被勾选项(未实现)</div>
          <div>
            <button type="button" onClick={() => (checkedItems = this.getCheckedItems(itemlist))}>当前勾选项</button>
            {checkedItems && (
              <pre>{JSON.stringify(checkedItems, null, 2)}</pre>
            )}
          </div>
        </div>
        <div><button type="button" onClick={() => this.outputData(itemlist)}>Submit Order</button></div>
      </div>
    )
  }
}

export default ItemList
