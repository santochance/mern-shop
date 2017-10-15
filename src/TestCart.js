/* eslint no-unused-vars: 0 */

import React from 'react'
// import Cart from './Cart.js'
import ItemList from './ItemList.js'
import CartDetails from './components/CartDetails'
import ConfirmOrder from './components/ConfirmOrder'

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
          <CartDetails app={this} cart={this.state.cart} />
          <ConfirmOrder app={this} cart={this.state.cart} />
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
