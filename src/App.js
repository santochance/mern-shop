/* eslint no-unused-vars: 0 */

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
// import Signup from './Signup.js'
import Signin from './Signin.js'
import Search from './Search.js'
import SearchResult from './SearchResult.js'
import Cart from './Cart.js'
import TestCart from './TestCart.js'

import ProductDetail from './ProductDetail.js'
import ConfirmOrder from './ConfirmOrder.js'
import CreateProduct from './CreateProduct.js'

import DataGrid from './DataGrid.js'
import ItemList from './ItemList.js'

import ProductNew from './ProductNew.js'
import OrderHistory from './OrderHistory.js'

import Admin from './Admin.js'
import UserCrud from './UserCrud.js'
import UserAdmin from './components/UserAdmin.js'
import {
  Login,
  Signup,
  UserCenter,
  ProductList,
} from './components'
import EditUserForm from './components/EditUserForm.js'

import {
  addItem,
  addOrder,
  addEntry,
  createEntry,
  aggregate,
  updateItem,
  countItem,
} from './cart_func.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: createEntry('orders'),
      expanded: false
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
          if (item.product._id === product._id) {
          // 已有product， 调整item的数量
            item.count += count
            updateItem(item)
            return true
          }
        // 没有product, 创建新的item
        // order.items.push(createItem(product, count))
        }) || addItem(order, product, count)
        return true
      }
    // 不存在包含product的order，创建新的order
    // cart.orders.push(createOrder(product, count))
    }) || addOrder(cart, product, count)

    console.log('cart:\n', cart)

    for (let [i, order] of cart.orders.entries()) {
      console.log(`order${i} -- count: ${order.count}, price: ${order.price}`)
      for (let [j, item] of order.items.entries()) {
        console.log(`item${j} -- count: ${item.count}, price: ${item.price}`)
      }
    }

    this.setState({ ...this.state, cart: cart })

  }

  render() {
    let { cart, expanded } = this.state

    return (
      <Router>
        <div className="App">
          <DevIndex />
          <SiteNav />
          <div className="page">
            <Route path="/productlist" component={ProductList} />
            <Route path="/usercenter" component={UserCenter} />
            <Route path="/edituserform" component={EditUserForm} />
            <Route path="/login" component={Login} />
            <Route path="/useradmin" component={UserAdmin}></Route>
            <Route path="/productnew" component={ProductNew}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/searchresult" component={SearchResult}></Route>
            <Route path="/products/:id" render={props => <ProductDetail {...props} onAddToCart={this.addToCart} />} />
            <Route path="/search" render={props => {
              // debugger
              return <Search {...props} onAddToCart={this.addToCart} />
            }} />

            <Route path="/createproduct" component={CreateProduct} />

            <Route path="/testcart" component={TestCart} />

            <Route path="/cart" render={props => (
              (1 < 2) ? (
                <Cart {...props} cart={cart}/>
              ) : (
                <Redirect to={{
                  pathname: '/signup',
                  state: { from: props.location }
                }}></Redirect>
              )
            )}></Route>

            <Route path="/datagrid" component={DataGrid} />
            <Route path="/itemlist" component={ItemList} />

            <Route path="/confirmorder" component={ConfirmOrder} />
            <Route path="/orderhistory" component={OrderHistory} />

            <Route path="/admin" component={Admin}></Route>
            <Route path="/usercrud" component={UserCrud}></Route>
          </div>
          <div className="sidebar" style={!expanded ? {
            right: '-265px',
            display: 'none',
          } : null}>
            <div className="btn-bar">
              <button className="btn btn-default"
                onClick={() => this.setState({ expanded: !expanded })}>购物车</button>
            </div>
            <div className="content">
              {cart.orders.map((order, i) => (
                <div>
                  <div>Item in order is {order.count}</div>
                  <ul>
                    {order.items.map((item, j) => (
                      <li className="item" key={j}>
                        <div>{`Id: ${item.product._id}`}</div>
                        <div>{`Price: ${item.product.price}`}</div>
                        <div>{`Title: ${item.product.title}`}</div>
                        <div>{`amount: ${item.count}`}
                          <input type="number" name="" id=""
                            value={item.count} min="1"
                            onChange={(e) => {
                              item.count = e.target.value
                              updateItem(item)
                              // updateItem(item, e.target.value)
                              this.setState({...this.state})
                            }}/>
                        </div>
                        <div>{`total: ${item.total}`}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="amountSum">
                合计 {this.state.cart.count} 件
              </div>
              <div className="priceSum">
                总共 {this.state.cart.price} 元
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
