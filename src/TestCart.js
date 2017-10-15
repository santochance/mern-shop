/* eslint no-unused-vars: 0 */

import React from 'react'
// import Cart from './Cart.js'
import ItemList from './ItemList.js'

import { random } from './helper/randoms.js'
import splitArray from './helper/splitArray.js'
import genIndexDisplay from './helper/genIndexDisplayer.js'

import './TestCart.css'
import './CartDetails.css'

// Cart 页内测试
export default class TestCart extends ItemList {
  constructor(props) {
    super(props);

    let { state } = this
    state.cart = state.itemlist
    // ItemList.js应用到App.js时
    // makeList报错是因为这里删除了itemlist属性？
    // delete state.itemlist
    // 应该是因为App没有把ItemList的state注入
    this.state = {
      ...state,
      products: null,
      user: {},
      selectedAddr: '广东省 深圳市 龙华新区 民治街道 塘水围新村三区3幢1102',
      // 分页初始化设置
      page: {
        size: 8
      }
    }
    // this.sortProductsBy = this.sortProductsBy.bind(this)
  }

  componentDidMount() {
    this.loadData()

    // 模拟添加products到cart，并check cart
    setTimeout(() => {
      let { data, page, cart } = this.state
      let products = data && data[page.index]
      let n = random(4, 7)
      while (n--) {
        this.addToCart(products[random(0, products.length - 1)])
      }
      setTimeout(() => {
        this.check(cart)
      }, 500)
    }, 800)
    window.app = this
  }

  addToCart(product, amount = 1) {
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

  loadData() {
    function configPagination (data) {
      // 获取分页的初始化设置
      let { size, index = 0 } = this.state.page
      // 生成分页相关数据
      let pageCfg = this.paginate(data, size, index)

      // 更新state
      this.setState({
        ...this.state,
        ...pageCfg,
      })
    }

    fetch('/products')
      .then(res => res.json())
      // .then(products => this.setState({ ...this.state, products }))
      .then(configPagination.bind(this))
      .catch(console.error)
  }

  filterBy() { }

  sortBy(entries, key, isDesc = true) {
    let sorter

    if (typeof isDesc === 'number') {
      isDesc = (isDesc !== 1)
    }

    if (key) {
      if (isDesc) {
        sorter = (a, b) => b[key] - a[key]
      } else {
        sorter = (a, b) => a[key] - b[key]
      }
    } else {
      if (isDesc) {
        sorter = (a, b) => b - a
      } else {
        sorter = (a, b) => a - b
      }
    }

    return entries.sort(sorter)
  }

  sortProductsBy(key, isDesc) {
    debugger

    let { products } = this.state
    this.setState({
      ...this.state,
      products: this.sortBy(products, key, isDesc)
    })
  }

  // pagination
  paginate(data, size, index = 0) {
    let splitedData = splitArray(data, size)
    let total = splitedData.length
    let displayer = genIndexDisplay({ total })

    return {
      rawData: data,
      data: splitedData,
      page: {
        size,
        index,
        total,
      },
      displayer
    }
  }

  gotoPage(index) {
    let { page } = this.state
    let total = page.total

    // 修正index
    index = index >= 0
      ? index < total
        ? index
        : total - 1
      : 0

    // 应用index
    page.index = index
    this.setState({...this.state, page})
  }

  submitOrder() {

  }

  render() {

    let { data, displayer, page } = this.state
    // displayer.show()要求1-based的index
    let indexKeys = displayer && displayer.show(page.index)
    let products = data && data[page.index]

    if (!products) return null
      // console.log('curr products:', products)
    return (
      <div className="app">
        <div style={{
          // display: 'flex',
          // flexDirection: 'column',
        }}>
          <CartDetails app={this} />
          <ConfirmOrder app={this} />
          <ProductList app={this} products={products} indexKeys={indexKeys} index={page.index} />

        </div>

        {/*
          {this.cart ? (
            <div style={{ display: 'flex' }}>
            </div>
          ) : (
            <div>Cart is not loaded yet.</div>
          )}
        <ConfirmOrder cart={this.cart} />
        */}
      </div>
    )
  }
}

const ProductList = (props) => {
  // let products = props.products
  // let app = props.app
  let { app, products, indexKeys, index } = props

  // console.log('products in ProductList:', products)

  return (
    <div style={{
      // height: '80vh',
      // overflow: 'auto',
    }}>
      <div className="main-content">
        <div className="left-box">
          <Grid {...{ products, app }} />
          <List {...{ products, app }} />
        </div>
        <div className="right-box"></div>
        <Pagination indexKeys={indexKeys} index={index} gotoPage={(index) => app.gotoPage(index)} />
      </div>
    </div>
  )
}

const Pagination = (props) => {
  let { indexKeys, prevLabel = '\u00AB', nextLabel = '\u00BB', index, gotoPage } = props
  let prevDisabled = !indexKeys.all[0]
  let nextDisabled = !indexKeys.all.slice(-1)[0]

  // console.log('indexKeys in pagination:', indexKeys)
  // console.log('num keys', indexKeys.slice(1, -1))
  return (
    <div className="Page navigation">
      <ul className="pagination">
        <li className={prevDisabled && 'disabled'}>
          <a href="#"aria-label="Previous" onClick={() => gotoPage(index - 1)}>
            <span aria-hidden="true">{prevLabel}</span>
          </a>
        </li>
        {indexKeys.all.slice(1, -1).map((key, i) =>
          (key === '...') ? (
            <span style={{float: 'left', padding: '6px 12px'}}>{key}</span>
          ) : (
            <li key={i} className={typeof key === 'string' && 'active'}
              onClick={() => gotoPage(parseInt(key) - 1)}>
              <a href={'#' + key}>{key}</a>
            </li>
          )
        )}
        <li className={nextDisabled && 'disabled'}>
          <a href="#" aria-label="Next" onClick={() => gotoPage(index + 1)}>
            <span aria-hidden="true">{nextLabel}</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

const GridTotal = (props) => {
  let { app, products } = props

  return (
    <div className="grid-total">
      <div className="grid-left">
        <div className="grid-sortbar">
          <ul>
            <li onClick={() => app.sortProductsBy()}>综合</li>
            <li onClick={() => app.sortProductsBy('sales')}>销量</li>
            <li onClick={() => app.sortProductsBy('listingDate')}>上市时间</li>
            <li onClick={() => app.sortProductsBy('price')}>价格从高到低</li>
            <li onClick={() => app.sortProductsBy('price', 1)}>价格从低到高</li>
          </ul>
        </div>
        <div className="grid">
          {products.map((product, i) => (
            <div className="grid-item product">
              <div className="imgWrap">
                <a href="">
                  <img src="" alt="" width="200" height="200"/>
                </a>
              </div>
              <div className="title-row">
                <a href="">
                  <span className="title">{product.productName || 'Product Name'}</span>
                  <span className="desc">{product.description || 'Product desc...'}</span>
                </a>
              </div>
              <div className="sale-row">
                <div className="price">{product.price || 'Product price'}</div>
                <div className="sales">{product.sales || 'Product sales'}</div>
              </div>
              <div className="btn-row">
                <input type="number" name="" id=""/>
                <button className="btn btn-danger" onClick={() => app.addToCart(product, 1)}>添加到购物车</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Grid = (props) => {
  let { app, products } = props

  return (
    <div className="list-container grid-mode">
      <div className="list-wrapper">
        {products.map((product, i) => (
          <div key={i} className="list-item">
            <div className="img-wrapper">
              <img src="" alt=""/>
            </div>
            <div className="img-caption">
              <div className="title">{product.productName}}</div>
              <div className="sale">Sale {i}</div>
              <div className="op">
                <input className="amount" type="number" name="" id=""/>
                <div className="addToCart-btn">
                  <button className="btn btn-danger" onClick={() => app.addToCart(product, 1)}>添加到购物车</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const List = (props) => {
  let { products } = props

  return (
    <div className="list-container list-mode">
      <div className="list-wrapper">
        {products.map((item, i) => (
          <div key={i} className="list-item">
            <div className="col">
              <div className="img-wrapper">
                <img src="" alt=""/>
              </div>
            </div>
            <div className="col">
              <div className="title">{item.productName}</div>
              <div className="icon">Icon 0</div>
              <div className="shop">Shop 0</div>
            </div>
            <div className="col">
              <div className="price">Price</div>
            </div>
            <div className="col">
              <div className="deal-cnt">xxx人付款</div>
            </div>
            <div className="col">
              <div className="server-icons">Service-icons</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CartDetails = (props) => {
  let app = props.app
  let { cart } = app.state

  /* 测试获取勾选项 */
  let checkedItems = app.getCheckedItems(cart)
  console.log('checked items:', checkedItems)

  return (
    <div className="cart">
      <div className="cart-main">
        <div className="cart-desc">
          <div className="th desc-check">
            <label>
              <input type="checkbox" name="" id=""
                checked={cart.checked}
                onChange={() => app.check(cart)}
              />全选
            </label>
          </div>
          <div className="th desc-info">商品信息</div>
          <div className="th desc-param">&nbsp;</div>
          <div className="th desc-price">单价
          </div>
          <div className="th desc-quantity">数量</div>
          <div className="th desc-sum">金额</div>
          <div className="th desc-opera">操作</div>
        </div>
        <div className="order-list">
          {cart.children.map((order, i) => (
            <div key={i} className="order-content">
              {/*
                <div className="order-shopInfo">
                  <div className="checkOrder">
                    <input type="checkbox" name="" id=""
                      checked={order.checked}
                      onChange={() => app.check(order)}/>
                  </div>
                  <span className="badge shopIcon">badge</span>
                  <span>Shop Name</span>
                  <span>Count: {order.count}</span>{'  '}
                  <span>Price: {order.price}</span>
                </div>
              */}
              <div className="order-items">
                {order.children.map((item, i) => (
                  <div key={i} className="item-content">
                    <div className="col cell-check">
                      <input className="check" type="checkbox" name="" id=""
                        checked={item.checked}
                        onChange={() => app.check(item)}/>
                    </div>
                    <div className="col cell-info">
                      <div className="col cell-image">
                        <img src="" alt=""/>
                      </div>
                      <div className="col cell-title">{item.content.productName || '商品标题...'}</div>
                    </div>
                    <div className="col cell-param"></div>
                    <div className="col cell-price">
                      <div className="price-now">￥{item.content.price}</div>
                    </div>
                    <div className="col cell-quantity">
                      <input type="number" name="" id="" min="1"
                        value={item.amount} style={{width: '80px'}}
                        onChange={(e) => app.updateItem(item, e.target.value || 1)} />
                    </div>
                    <div className="col cell-sum">
                      <div className="item-sum">￥{item.price}</div>
                    </div>
                    <div className="col cell-opera">
                      <div>
                        <a href="#" onClick={() => app.removeItem(item)}>删除</a>
                      </div>
                      <div>
                        <a href="#">移入收藏夹</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="order-footer">
          <div className="footer-check">
            <label>
              <input type="checkbox" name="" id=""
                checked={cart.checked}
                onChange={() => app.check(cart)}
              />全选
            </label>
          </div>
          <div className="footer-opera">
            <a className="footer-favSelected">
              移入收藏夹
            </a>
            <a className="footer-delSelected"
              onClick={(e) => {
                e.preventDefault()
                app.batchRemoveItems(checkedItems)
              }}>
              删除
            </a>
          </div>
          <div className="footer-right">
            <div className="amount-sum">
              <span className="text">已选商品</span>
              <span className="selectedItemCount">{cart.count || 0}</span>
              <span className="text">件</span>
            </div>
            <div className="price-sum">
              <span className="text">合计（不含运费）：</span>
              <span className="price">
                <span className="totalSymbol">￥</span>
                <span className="total">{cart.price || 0}</span>
              </span>
            </div>
            <a className="checkout">结&nbsp;算</a>
            {checkedItems.length < 1 && (
              <div>禁用按钮中！</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ConfirmOrder = (props) => {
  let app = props.app
  let { cart, selectedAddr } = app.state

  // console.log('cart:', cart)

  return (
    <div className="order-confirm">
      <div className="order-address"></div>
      <div className="order-orderDesc">
        <div>确认订单</div>
        <div className="tr desc-row">
          <div className="th desc-info">商品信息</div>
          <div className="th desc-param">商品属性</div>
          <div className="th desc-price">单价</div>
          <div className="th desc-quantity">数量</div>
          <div className="th desc-discount">优惠</div>
          <div className="th desc-sum">小计</div>
        </div>
      </div>
      <div className="order-list">
        {cart.children.map((order, i) => order.count > 0 && (
          <div key={i} className="order-content">
            <div className="order-shopInfo">
              <span className="badge">badge</span>
              <span className="shop-name">Shop Name</span>
              <span className="shop-seller">Seller</span>
            </div>
            <div className="order-items">
              {order.children.map((item, i) => item.checked && (
                <div key={i} className="tr item-content">
                  <div className="td cell-info">
                    <div className="td cell-image">
                      <a className="image-wrapper" href="">
                        <img src="" alt=""/>
                      </a>
                    </div>
                    <div className="td info-content">
                      <div className="td cell-title">{item.content.productName}</div>
                      <div className="td cell-icons"></div>
                    </div>
                  </div>
                  <div className="td cell-param"></div>
                  <div className="td cell-price">{item.content.price}</div>
                  <div className="td cell-quantity">{item.amount}</div>
                  <div className="td cell-discount">{item.discount}</div>
                  <div className="td cell-sum">{item.price}</div>
                </div>
              ))}
            </div>
            <div className="order-ext">
              <div className="order-message">
                <span className="message-name">给卖家留言：</span>
                <span className="message-detail">
                  <input type="text"/>
                </span>
              </div>
              <div className="order-delivery">
                <div className="delivery-title">
                  运送方式：
                </div>
                <div className="delivery-select">
                  <span className="select-info">普通配送</span>
                  <span className="select-price">{order.shipping}</span>
                </div>
              </div>
            </div>
            <div className="order-total">
              <span>(含运费)</span>
              <span className="order-sum">￥{order.realPay}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="order-payInfo">
        <div className="payInfo-wrapper">
          <div className="order-realPay">
            <strong className="realPay-title">实付款：</strong>
            <span className="realPay-currency">￥</span>
            <span className="realPay-price">{cart.realPay}</span>
          </div>
          <div className="order-confirmAddr">
            <div className="confirmAddr-addr">
              <strong className="confirmAddr-title">寄送至：</strong>
              <span className="confirmAddr-bd">
                {selectedAddr}
              </span>
            </div>
            <div className="confirmAddr-user">
              <strong className="confirmAddr-title">收货人：</strong>
              <span className="confirmAddr-bd">User Info...</span>
            </div>
          </div>
        </div>
      </div>
      <div className="order-submitOrder">
        <div className="submitOrder-wrapper">
          <a href="#" className="go-back">返回购物车</a>
          <a href="" className="btn btn-danger go-submit"
            onClick={() => this.submitOrder()}>提交订单</a>
        </div>
      </div>
    </div>
  )
}
