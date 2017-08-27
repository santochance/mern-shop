import React, { Component } from 'react'
import './Cart.css'
import './ConfirmOrder.css'

import fakeData from './fakeData/fakeData-Order.js'
let { orders } = fakeData

function addToCart(product, count = 1) {
  // 迭代cart的orders搜索product
  let cart
  cart.orders.forEach((order) => {
    return (order.seller._id === product.seller._id) ? (
      // 存在product所属seller的order, 迭代items
      order.items.forEach((item) => {
        return (item.product.id === product._id) ? (
          // 调整item的数量
          // item.adjustBy(count)
          (item.count += count),
          updateItem(item)
        ) : (
          // 创建新的item
          // order.items.push(createItem(product, count))
          addItem(order, product, count)
        )
      })
    ) : (
      // 不存在order，创建新的order
      // cart.orders.push(createOrder(product, count))
      addOrder(cart, product, count)
    )
  })
  console.log('cart:\n', cart)
}

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

function createEntry(key, content = [], count = 1) {
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
    entry.children.reduce((sum, item) => {
      sum.price += item.price
      sum.discount += item.discount
      sum.shipping += item.shipping
      sum.total = sum.price - sum.discount + sum.shipping
      return sum
    }, rst)
  } else {
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

function updateItem(item) {
  let curr = item
  do {
    aggregate(curr)
    curr = curr.parent
  } while (curr)
}

//
  // function createOrder(product, count = 1) {
  //   let order = createEntry(createItem(product, count), 'items')
  //   order.seller = product.seller
  //   return order
  // }

  // function createItem(product, count = 1) {
  //   return createEntry(Array(count).fill(product), 'product')
  // }

  // function createEntry(content, contentKey = 'content') {
  //   return {
  //     children: content,
  //     [contentKey]: content,
  //     count: content.length,
  //     ...attrSum(content),
  //     checked: false
  //   }
  // }

  // function addOrder(cart, order) {
  //   addEntry(cart, order)
  // }

  // function addItem(order, item) {
  //   addEntry(order, item)
  // }

  // function addEntry(parent, entry) {
  //   entry.parent = parent
  //   parent.children.push(entry)
  // }

  // function attrSum(entries) {
  //   return entries.reduce((sum, entry) => {
  //     sum.price += entry.price
  //     sum.discount += entry.discount
  //     sum.shipping += entry.shipping
  //     sum.total = sum.price - sum.discount + sum.shipping
  //     return sum
  //   }, {price: 0, discount: 0, shipping: 0, total: 0})
  // }

export default class Cart extends Component {

  constructor(props) {
    super(props);

    this.state = {

      orders: [
        {
          seller: {},
          items: [
            {
              product: {},
              price: 0,
              discount: 0,
              shipping: 0,
              total: 0,
              checked: false,
            }
          ],
          price: 0,
          discount: 0,
          shipping: 0,
          total: 0,
          allChecked: false,
          checkedItems: [],
        }
      ],

      orders: orders,
      invalidItems: [],
      itemCount: 0,
      total: 0,
      allChecked: false,
    }

    // this.state = createEntry([], 'orders')

    this.check = this.check.bind(this)
    /*
    this.checkOne = this.checkOne.bind(this)
    this.checkAll = this.checkAll.bind(this)
    */
  }

  check(self, parent, children) {
    self.checked = !self.checked
    parent && (parent.checked = parent.children.every((child) => (child.checkd = self.checked)))
    children.forEach((child) => (child.checked = self.checked))
  }

  render() {
    let { orders } = this.state

    return (
      <section className="cart">
        <header className="cart-header">
          <div className="brand">
            <img width="150" height="50" src="" alt="Logo" className="logo"/>购物车
          </div>
          <div className="search-bar">
            <input type="text"/>
          </div>
        </header>
        <section className="cart-items">
          <header>
            <div className="filter-tabs"></div>
          </header>
          <secstion className="grid">
            <div className="list-title">
              <div className="col-selectAll">
                <input type="checkbox" name="" id=""/>全选
              </div>
              <div className="col-info">
                商品信息
              </div>
              <div className="col-quantity">
                数量
              </div>
              <div className="col-price">
                单价
              </div>
              <div className="col-sum">
                金额
              </div>
              <div className="col-option">
                操作
              </div>
            </div>
            <div className="list-group">
              <div className="group-title">
                <input type="checkbox" name="" id=""/>
                <span className="badge">badge</span>
                <span>店铺：XXXX</span>
              </div>

              <div className="item group-item">
                <div className="col col-check">
                  <input type="checkbox" name="" id=""/>
                </div>
                <div className="col col-thumbnail">
                  <img width="80" height="80" src="" alt="IMGthumbnail"/>
                </div>
                <div className="col col-title">Title</div>
                <div className="col col-param">Param</div>
                <div className="col col-quantity">10</div>
                <div className="col col-price">￥40</div>
                <div className="col col-sum">
                  400
                </div>
                <div className="col col-option">
                  options
                </div>
              </div>
              <div className="item group-item">
                <div className="col col-check">
                  <input type="checkbox" name="" id=""/>
                </div>
                <div className="col col-thumbnail">
                  <img width="80" height="80" src="" alt="thumbnail"/>
                </div>
                <div className="col col-title">Title</div>
                <div className="col col-param">Param</div>
                <div className="col col-price">￥40</div>
                <div className="col col-quantity">10</div>
                <div className="col col-sum">
                  400
                </div>
                <div className="col col-option">
                  options
                </div>
              </div>
            </div>

            <div className="order-orderDesc">
              <div>确认订单</div>
              <div className="tr">
                <div className="th all-chk">
                  <input type="checkbox" name="" id=""
                    onChange={() => check(this.state, null, orders)} />全选
                </div>
                <div className="th cell-info">商品信息</div>
                <div className="th cell-prop">商品属性</div>
                <div className="th cell-price">单价</div>
                <div className="th cell-amount">数量</div>
                <div className="th cell-discount">优惠</div>
                <div className="th cell-total">小计</div>
              </div>
            </div>
            {orders.map((order, index) => (
              <div className="order-orderInfo">
                <div className="order-shopInfo">
                  <div className="order-chk">
                    <input type="checkbox" name="" id=""
                      checked={order.checked}
                      onChange={() => this.checkAll(order, index, orders)}/>
                  </div>
                  <div className="shop-name">Seller</div>
                </div>
                {order.items.map((item, index) => (
                  <div className="tr order-item">
                    <div className="td cell-prodInfo">
                      <div className="td cell-chk">
                        <input type="checkbox" name="" id=""
                          checked={item.checked}
                          onChange={() => this.checkOne(item, index, order.items, order)}/>
                      </div>
                      <div className="td cell-img">Something</div>
                      <div className="td cell-title">{item.product.name}</div>
                      <div className="td cell-prop">Prop</div>
                    </div>
                    <div className="td cell-price">{item.price}</div>
                    <div className="td cell-amount">{item.amount}</div>
                    <div className="td cell-discount">{item.discount}</div>
                    <div className="td cell-total">{item.total}</div>
                  </div>
                ))}
                <div className="order-message">给卖家的留言：{order.message}</div>
                <div className="order-shipping">运费：<span>{order.shipping}</span></div>
                <div className="order-payment">店铺合计（含运费）<span>{order.total}</span></div>
              </div>
            ))}
          </secstion>
        </section>
        <footer>
          <div className="left">
            <input type="checkbox" name="" id=""/>全选
            <a href="#" id="js-deleteSelect">删除</a>
            <a href="#" id="js-clearInvalid">清除失效宝贝</a>
            <a href="#" id="js-toFav">移入收藏夹</a>
            <a href="#" id="js-share">分享</a>
          </div>
          <div className="right">
            <div className="quantity-sum">
              已选商品<span id="js-selectdItemCount">{this.state.count}</span>件<span className="item-collapse">^</span>
            </div>
            <div className="price-sum">
              合计（不含运费）：<span id="js-total">{this.state.total}</span>
            </div>
            <button className="btn btn-default">结算</button>
          </div>
        </footer>
      </section>
    )
  }
}
