/* eslint no-unused-vars: 0 */

import React, { Component } from 'react';
// import logo from './logo.svg';
import ItemList from './ItemList'

import _ from 'lodash'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import routes from './routes.js'

import './App.css';
import './auxi_img_placeholder.css'

import SiteNav from './SiteNav.js'

import CartDetails from './components/CartDetails'
import ConfirmOrder from './components/ConfirmOrder'

const DevIndex = () => (
  <div>
    <ul className="route-nav" style={{
      display: 'flex',
      flexWrap: 'wrap',
      margin: '5px 0',
      padding: 0,
    }}>
      {routes.map((route, idx) => (
        <li key={idx} style={{marginLeft: '2em'}}>
          <Link to={route.path}>{_.camelCase(route.path)}</Link>
        </li>
      ))}
    </ul>
  </div>
)

class App extends ItemList {
  state = {
    logined: false,
    selectedAddr: '广东省 深圳市 龙华新区 民治街道 塘水围新村三区3幢1102',
  }

  addToCart = (product, amount = 1) => {
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

  render() {
    let {
      logined,
      cart,
      selectedAddr,
    } = this.state

    return (
      <Router>
        <div className="App">
          <DevIndex />
          <SiteNav />
          <div className="page">
            {routes.map((route, idx) => (
              <Route {...route} />
            ))}
            <Route path="/cart-details" render={props => (
              (logined) ? (
                <CartDetails {...props} cart={cart}
                  toggleCheck={(...arg) => this.check(...arg)}
                  updateItem={(...arg) => this.updateItem(...arg)}
                  removeItem={(...arg) => this.removeItem(...arg)}
                />
              ) : (
                <Redirect to={{
                  pathname: '/signup',
                  state: { from: props.location }
                }}></Redirect>
              )
            )} />
          <Route path="confirm-order" render={props => (
              <ConfirmOrder {...props} cart={cart} selectedAddr={ selectedAddr} />
            )
          } />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
