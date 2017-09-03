import React from 'react'
// import Cart from './Cart.js'
import ItemList from './ItemList.js'

import './TestCart.css'
// Cart 页内测试
export default class TestCart extends ItemList {
  constructor(props) {
    super(props);

    let { state } = this
    state.cart = state.itemlist
    delete state.itemlist
    this.state = {
      ...state,
      products: null,
      user: null,
    }
    // this.sortProductsBy = this.sortProductsBy.bind(this)
  }

  componentDidMount() {
    this.loadData()
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
    fetch('/products')
      .then(req => req.json())
      .then(products => this.setState({ ...this.state, products }))
      .catch(console.error)
  }

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

  render() {
    let { products } = this.state

    if (!products) return null

    return (
      <div className="app">
        {/*
        <div className="billboard" style={{
          position: 'fixed',
          zIndex: 10,
          top: '100px',
          right: '80px',
          width: '300px',
          outline: '1px solid black'
        }}>
          <div>Loaded Data:</div>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
        */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <ProductList app={this} products={products} />
          <CartDetails app={this} />
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
  let products = props.products
  let app = props.app

  return (
    <div style={{
      // width: '350px',
      height: '80vh',
      overflow: 'auto',
    }}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const CartDetails = (props) => {
  let app = props.app
  let { cart } = app.state

  return (
    <div>
      <div>Cart is loaded.</div>
      <div className="tr cart-desc">
        <div className="th chk">
          <input type="checkbox" name="" id="" />全选
        </div>
      </div>
      <div className="cart-orders">
        {cart.children.map((order, i) => (
          <div key={i} >
            <div className="shopInfo">
              <input type="checkbox" name="" id=""/>店铺：xxx
            </div>
            <div className="itemInfo">
              {order.children.map((item, j) => (
                <pre key={j}>{JSON.stringify(item.content, ['_id', 'title', 'price'], 2)}</pre>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ConfirmOrder = (props) => {
  let app = props.app
  let { cart } = app.state.cart
  return (
    <div>
      <div>Placeholder for Address Radio Group</div>
      <div>
        <h3>确认订单</h3>
        <div className="order-desc">
          Placeholder for Order Desc Heading
        </div>
        <div className="order-orders">
          {cart.children.map(order => order.count > 0 && (
           <div>
              <div>
               <div className="shopInfo">店铺：xxx</div>
             </div>
             <div className="itemInfo">
               {order.children.map(item => item.checked && (
                 <pre>{JSON.stringify(item, null, 2)}</pre>
               ))}
             </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  )
}
