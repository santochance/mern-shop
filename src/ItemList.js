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
        checked: false,
      },
    }
    this.check = this.check.bind(this)
  }

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      // .then(products => this.setState({ ...this.state, products, prod: products, p: products  }))
      .then(products => this.setState({ ...this.state, products }))
      .then(() => setTimeout(() => this.makeList(), 200))
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
          random(1, 6))
      )
    }

    // 更新state
    this.setState({...this.state})
  }

  outputData(itemlist) {
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
      parent: null,
      checked: false,
    }
  }

  createList(items) {
    return {
      title: 'Order',
      count: 0,
      price: 0,
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

  updateItem(item, amount) {
    item.amount = amount
    // 更新amount后触发更新item aggregation
    item.price = item.content.price * amount
    // 同时要更新祖先的aggregation和count
    // ...

    // this.refresh()
    this.countUpwards(item.parent)
    this.setState({...this.state})
  }

  aggregate() {

  }

  check(item) {
    item.checked = !item.checked
    this.updateChecked(item)

    this.countUpwards(item.parent)

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

        <div><button type="button" onClick={() => this.outputData(itemlist)}>Submit Order</button></div>
      </div>
    )
  }
}

export default ItemList
