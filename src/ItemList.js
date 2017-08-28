import React from 'react'

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
  constructor(prop) {
    super(prop)
    this.state = {
      itemlist: {
        title: 'ItemList',
        count: 0,
        price: 0,
        parent: null,
        children: [],
      },
    }
  }

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      // .then(products => this.setState({ ...this.state, products, prod: products, p: products  }))
      .then(products => this.setState({ ...this.state, products }))
      .then(() => setTimeout(() => this.makeList(), 200))
      .catch(console.error)
  }

  componentDidUpdate() {
    // debugger
  }

  makeList() {
    let { itemlist, products } = this.state
    // 创建一个list
    this.append(itemlist, this.createList())

    // 在这个list中创建若干个内容, 数量随机的item
    let n = random(3, 6)
    while(n--) {
      this.append(itemlist.children[0],
        this.createItem(products[random(products.length)],
          random(1, 6))
      )
    }

    // 更新state
    this.setState(...this.state)
  }

  createItem(content, amount) {
    return {
      content,
      title: 'Item',
      amount: amount,
      count: 1,
      price: content.price * amount || 0,
      shipping: random(6),
      discount: random(4),
      realPay: random(8),
      parent: null
    }
  }

  createList(items) {
    return {
      title: 'Order',
      count: 0,
      price: 0,
      parent: null,
      children: []
    }
  }

  append(list, item) {
    // 连接list和item
    item.parent = list
    // 插入item到list
    list.children.push(item)

    // 从list开始往上迭代计算count
    this.countUpwards(list)

    // 往上迭代计算aggregate


    // 在把item插入list时就更新count
    // count准确地说是leafCount

    // 对于list
    // list.count = list.children.length

    // 如果children为空，leafCount = 0
    // 如果children不为空，且为最底层具有children的对象
    // if (list.children[0] )
    // 对于itemlist
    // itemlist.count = itemlist.children.reduce(list => list.children.length)

    // this.refresh()
    // // 返回count, 需求自动设置到list
    // list.count = this.countItem(list)
    this.setState({...this.state})
  }

  countUpwards(entry) {
    while(entry) {
      // // entry.count = entry.children.reduce((count, child) => (count += child.count), 0)
      // // entry.price = entry.children.reduce((price, child) => (price += child.price), 0)

      // entry.children.reduce((sum, child) => {console.log()}, {count: 0, price: 0})
      Object.assign(entry, entry.children.reduce((sum, child) => {
        sum.count += (child.count || 0)
        sum.price += (child.price || 0)
        sum.discount += (child.discount || 0)
        sum.shipping += (child.shipping || 0)
        sum.realPay += (child.realPay || 0)
        // !!!! 记得要返回值  !!!!!
        return sum
      }, {count: 0, price: 0, discount: 0, shipping: 0, realPay: 0}))


      entry = entry.parent
    }
  }

  removeItem(item, index) {
    let list = item.parent
    list.children.splice(index, 1)

    this.countUpwards(list)

    // list.count = list.children.reduce((count, child) => (count += child.count), 0)

    // this.refresh()
    // 返回count, 需求自动设置到list
    // let list = item.parent
    // list.count = this.countItem(list)
    this.setState({...this.state})
  }

  clearItems(list) {
    list.children.splice(0)

    this.countUpwards(list)

    // list.count = list.children.reduce((count, child) => (count += child.count), 0)
    // this.refresh()

    // 返回count, 需求自动设置到list
    // list.count = this.countItem(list)
    this.setState({...this.state})
  }

  updateItem(item, amount) {
    item.amount = amount
    // 更新amount后触发更新item aggregation
    item.price = item.content.price * amount
    // 同时要更新祖先的aggregation和count
    //...

    // this.refresh()
    this.countUpwards(item.parent)
    this.setState({...this.state})
  }

  refresh() {
    // function countItem(entry, countSum = 0) {
    //   // 如果entry是order级
    //   if (entry.children[0].content) {
    //     return entry.children.length
    //   }

    //   // 否则遍历entry.children，对每一元素递归调用countItem()
    //   return entry.children.reduce((count, e) => {
    //     // console.log('count in reduce is %s now', count)
    //     return (count += countItem(e, count))
    //   }, countSum)
    // }

    // // 更新count
    // countItem(this.state.itemlist)

    let { itemlist } = this.state
    // // 更新count
    // itemlist.count = itemlist.children.reduce((count, list) => {
    //   return (count += list.children.length)
    // }, 0)

    // itemlist.count = this.countItem(itemlist)
    this.countItem(itemlist)
    this.setState({...this.state})
    // 更新aggregation
  }

  aggregate() {

  }

  // countItem(list, countSum = 0) {

    //   // debugger

    //   // list里的一个空位
    //   if (!list) {
    //     return (list.count = 0)
    //   }

    //   // 叶对象
    //   if (!list.children) {
    //     return (list.count = 1)
    //   }

    //   // 空list
    //   if (list.children.length === 0) {
    //     return (list.count = 0)
    //   }

    //   // 非空list
    //   // 此处返回值就是某一节点list计算出的leafCount
    //   return (list.count = list.children.reduce((count, e) => {
    //     return (count += this.countItem(e, count))
    //   }, countSum))
    // }

  countItem(list, countSum = 0) {

    // list里的一个空位
    if (!list) {
      return (0)
    }

    // 叶对象
    if (!list.children) {
      return (1)
    }

    // 空list
    if (list.children.length === 0) {
      return (0)
    }

    // 非空list
    // 此处返回值就是某一节点list计算出的leafCount
    return (list.children.reduce((count, e) => {
      e.count = this.countItem(e, count)
      return (count += e.count)
    }, countSum))
  }

  render() {
    let { itemlist, products } = this.state

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
          <button className="btn btn-default" onClick={
            () => this.append(itemlist, this.createList())
          }>Create List</button>
          <span>Count: {itemlist.count}</span>
          <span>Price: {itemlist.price}</span>
          <div>
            <ul>
              {itemlist.children.map((list, i) => (
                <li key={i}>
                  <div>
                    <button className="btn btn-info btn-xs" onClick={
                      () => this.append(list, this.createItem(products[random(products.length)], random(1, 5)))
                    }>Create Item</button>
                    <button className="btn btn-danger btn-xs"
                     onClick={() => this.clearItems
                      (list)}>Clear Items</button>
                    <button className="btn btn-default btn-sm" onClick={() => this.removeItem(list, i)}>Remove List</button>
                  </div>
                  <div>
                    <strong>{list.title} {i}</strong>{' '}
                    <span>Count: {list.count}, Price: {list.price}</span>
                  </div>
                  <ul>
                    {list.children.map((item, j) => (
                      <li key={j}>
                        <button className="btn btn-danger btn-xs"
                          onClick={() => this.removeItem(item, j)}>Remove</button>
                        <span>{item.title} {j}: {item.content.title}</span>
                        <div>
                          Amount: {item.amount}{'  '}
                          <span><input type="number" min="1"
                          value={item.amount} style={{
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
      </div>
    )
  }
}

export default ItemList
