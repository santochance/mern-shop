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

function createOrder(product, count = 1) {
  // let order = createEntry(createItem(product, count), 'items')
  let order = createEntry([createItem(product, count)], { alias: 'items' })
  order.seller = product.seller
  return order
}

window.createEntry = createEntry

function createItem(product, count = 1) {
  // return createEntry(Array(count).fill(product), 'product')
  return createEntry(product, { alias: 'product', count })
}

// 注意返回的是一个对象，而不是对象的数组
function createEntry(content, { alias = 'content', count = 1 }) {
  if (Array.isArray(content)) {
    return {
      children: content,
      [alias]: content,
      count: content.length,
      // ...attrSum(content),
      checked: false
    }
  } else {
    return {
      children: null,
      [alias]: content,
      count,
      // ...attrSum([content]),
      checked: false
    }
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
  attrSum(parent.children, parent)

  // // 添加了新的entry, 往祖先递归更新求和值
  // do {
  //   attrSum(parent.children, parent)
  //   parent = parent.parent
  // } while (parent)
}

function attrSum(entries, initial) {
  return entries.reduce((sum, entry) => {
    sum.price += (entry.price || 0)
    sum.discount += (entry.discount || 0)
    sum.shipping += (entry.shipping || 0)
    sum.total = (sum.price - sum.discount + sum.shipping) || 0
    return sum
  }, initial || {price: 0, discount: 0, shipping: 0, total: 0})
}

function removeItem(index, items) {
  items.splice(index, 1)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cart: {
      //   content: [
      //     {
      //       product: {},
      //       amount: 0,
      //       total: 0
      //     }
      //   ],
      //   amountSum: 0,
      //   priceSum: 0
      // },
      cart: createEntry([], { alias: 'orders' }),
      expanded: true
    }

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(product, count = 1) {

    // 迭代cart的orders搜索product
    let cart = this.state.cart
    cart.orders.some((order) => {

      // 目前product还没有seller
      // if (order.seller._id === product.seller._id) {
      if (order.seller === product.seller) {
        // 存在product所属seller的order
        // 迭代items判断是否包含product
        order.items.some((item) => {
          if (item.product.id === product._id) {
          // 已有product， 调整item的数量
            item.count += count
            return true
          }
        // 没有product, 创建新的item
        // order.items.push(createItem(product, count))
        }) || addItem(order, createItem(product, count))
        return true
      }
    // 不存在包含product的order，创建新的order
    // cart.orders.push(createOrder(product, count))
    }) || addOrder(cart, createOrder(product, count))

    console.log(cart)
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
                {this.state.cart.orders.map((item, i) => (
                  <li className="item" key={i}>
                    <div>{`Id: ${item.product._id}`}</div>
                    <div>{`Price: ${item.product.price}`}</div>
                    <div>{`Title: ${item.product.title}`}</div>
                    <div>{`amount: ${item.count}`}</div>
                    <div>{`total: ${item.total}`}</div>
                  </li>))}
              </ul>
              <div className="amountSum">
                合计 {this.state.cart.count} 件
              </div>
              <div className="priceSum">
                总共 {this.state.cart.total} 元
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
