import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Panel } from 'react-bootstrap'

import './auxi_img_placeholder.css'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import DevIndex from './DevIndex.js'

import SiteNav from './SiteNav.js'
import Home from './Home.js'
import Signup from './Signup.js'
import Signin from './Signin.js'
import Search from './Search.js'
import SearchResult from './SearchResult.js'
import Cart from './Cart.js'

import ProductDetail from './ProductDetail.js'
import ConfirmOrder from './ConfirmOrder.js'


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

function createOrder(product, count = 1) {
  let order = createEntry(createItem(product, count), 'items')
  order.seller = product.seller
  return order
}

function createItem(product, count = 1) {
  return createEntry(Array(count).fill(product), 'product')
}

function createEntry(content, contentKey = 'content') {
  return {
    children: content,
    [contentKey]: content,
    count: content.length,
    ...attrSum(content),
    checked: false
  }
}

function addOrder(cart, order) {
  addEntry(cart, order)
}

function addItem(order, item) {
  addEntry(order, item)
}

function addEntry(parent, entry) {
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

function removeItem(index, items) {
  items.splice(index, 1)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {
        content: [
          {
            product: {},
            amount: 0,
            total: 0
          }
        ],
        amountSum: 0,
        priceSum: 0
      },
      expanded: false
    }

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(newItem) {
    let content = this.state.cart.content.slice()
    let { product: { _id, price }, amount } = newItem

    // 如果购物车中已经有该商品，修改数量
    content.some(item => {
      if (item.product._id === _id) {
        item.amount += amount
        item.total += price * amount
        return true
      }
    }) ||
    // 否则添加到购物车
      content.push({...newItem, total: price * amount})

    // 计算总数量和总金额
    let amountSum = content.length
    let priceSum = content.reduce((sum, item) => (sum += item.total), 0)

    this.setState({ cart: { content, amountSum, priceSum } })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <DevIndex />
          <SiteNav />
          <div className="page">
            <Route exact path="/" component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/searchresult" component={SearchResult}></Route>
            {/*
            <Route path="/search" component={Search}
              onAddToCart={this.addToCart}></Route>
            */}
            <Route path="/products/:id" render={props => <ProductDetail {...props} onAddToCart={this.addToCart} />} />
            <Route path="/search" render={props => {
              // debugger
              return <Search {...props} onAddToCart={this.addToCart} />
            }} />
            <Route path="/cart" render={props => (
              (1 < 2) ? (
                <Cart {...props} cart={this.state.cart}/>
              ) : (
                <Redirect to={{
                  pathname: '/signup',
                  state: { from: props.location }
                }}></Redirect>
              )
            )}></Route>

            <Route path="/confirmorder" component={ConfirmOrder} />
          </div>
          <div className="sidebar" style={!this.state.expanded ? {
            right: '-265px'
          } : null}>
            <div className="btn-bar">
              <button className="btn btn-default"
                onClick={() => this.setState({ expanded: !this.state.expanded })}>购物车</button>
            </div>
            <div className="content">
              <ul>
                {this.state.cart.content.map((item, i) => (
                  <li className="item" key={i}>
                    <div>{`Id: ${item.product._id}`}</div>
                    <div>{`Price: ${item.product.price}`}</div>
                    <div>{`Title: ${item.product.title}`}</div>
                    <div>{`amount: ${item.amount}`}</div>
                    <div>{`total: ${item.total}`}</div>
                  </li>))}
              </ul>
              <div className="amountSum">
                合计 {this.state.cart.amountSum} 件
              </div>
              <div className="priceSum">
                总共 {this.state.cart.priceSum} 元
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
