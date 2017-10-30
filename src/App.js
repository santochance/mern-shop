/* eslint no-unused-vars: 0 */

import React, { Component } from 'react';
// import logo from './logo.svg';
import ItemList from './ItemList'

import _ from 'lodash'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

import routes, {
  Home,
  Header,
  Footer,
  SiteNav,
  Signin,
  ProductDetails,
  ProductShow,
  CartDetails,
  ConfirmOrder,
  PayPrompt,
} from './routes'

import './assets/style/index.css'
import './App.css'

const DevIndex = () => (
  <div>
    <ul className="route-nav" style={{
      position: 'relative',
      zIndex: '1000',
      display: 'flex',
      flexWrap: 'wrap',
      margin: '5px 0',
      padding: 0,
    }}>
      {routes.map((route, idx) => (route.label === 'none' ? (null) : (
        <li key={idx} style={{marginLeft: '2em'}}>
          <Link to={route.path}>{route.label || _.camelCase(route.path)}</Link>
        </li>
      )))}
    </ul>
  </div>
)

class App extends ItemList {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      cart: this.state.itemlist,
      logined: false,
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.submitOrders = this.submitOrders.bind(this)
  }
  componentDidMount() {
    this.getHomeData()
      .then(home => this.setState({ home }))
  }
  login(data) {
    fetch('/api/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        res.json().then(user => {
          // 登录成功
          console.log('%s signed in.', user.username)
          window.auth = {
            ...user,
            isAuthed: true
          }
          this.setState({ logined: true }, () => {
            // 跳转到'/'
            // App中有history吗？
            this.props.history.push('/')
          }, 0)
        })
      } else {
        res.json().then(console.error)
      }
    }).catch(console.error)
  }

  logout() {
    fetch('/signout').then(res => {
      if (res.ok) {
        // 退出成功
        console.log('sign out successfully')
        window.auth = {isAuthed: false}

        this.setState({ logined: false }, () => {
          this.props.history.push('/')
        }, 0)
      }
    }).catch(console.error)
  }

  submitOrders() {
    let { cart } = this.state
    let submittedOrders = []
    let removedItems = []
    for (let list of cart.children) {
      // 跳过没有选中项的list
      if (list.count < 0) continue
      let filteredList = {...list, items: []}
      delete filteredList.parent

      for (let [index, item] of list.children.entries()) {
        if (item.checked) {
          // 发现被勾选的item
          filteredList.items.push(item)
          // this.removeItem(item, index)
          removedItems.push(item)
        }
      }

      // 添加公共属性
      Object.assign(filteredList, {
        // 添加购买者id
        buyer: '599a9ab2d8d1cd3200c509ab',
        // address: 'address from itemlist',
        // 更改订单状态为'created'
        status: 'created',
      })

      // 存入输出结果
      submittedOrders.push(filteredList)
    }

    // 发送数据
    fetch('/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submittedOrders, function(key, value) {
        if (key === 'parent') return
        return value
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(orders => {
            // 删除已经提交的item
            this.batchRemoveItems(removedItems)
            // 跳转到PayPrompt，并传入返回的orders数据
            this.props.history.push('/pay-prompt', { orders })
          })
        }
      })
  }

  getHomeData() {
    return fetch('/products/homeData')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .catch(console.error)
  }

  render() {
    let {
      logined,
      cart,
      home,
    } = this.state
    if (!home) return null

    return (
      <div className="app">
        <DevIndex />
        <Header {...{logined, cart, app: this}}/>
        <div className="wrapper">
          <Route path='/' exact render={props => (
            <Home {...props} data={home} app={this} />
          )} />
          <Route path="/signin" render={props => (
            <Signin {...props} login={this.login} />
          )} />
          <Route path="/product-show" render={props => (
            <ProductShow addToCart={this.addToCart} />
          )} />
          <Route path="/cart-details" render={props => (
            (logined) ? (
              <CartDetails {...props} cart={cart} app={this}
                toggleCheck={(...arg) => this.check(...arg)}
                updateItem={(...arg) => this.updateItem(...arg)}
                removeItem={(...arg) => this.removeItem(...arg)}
              />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }}></Redirect>
            )
          )} />
          <Route path="/product-details/:id" render={props => (
            <ProductDetails {...props} app={this} />
          )} />
          <Route path="/confirm-order" render={props => (
            <ConfirmOrder {...props} cart={cart} app={this} />
          )} />
          <Route path="/pay-prompt" component={PayPrompt} />
          {/* Other Routes */}
          {routes.map((route, idx) => (route && route.hidden ? (null) : (
            <Route key={idx} {...route} />
          )))}
        </div>
        <Footer />
      </div>
    )
  }
}

const AppWithRouter = withRouter(App)

const AddedRouterApp = () => {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  )
}

export default AddedRouterApp;
