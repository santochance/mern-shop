/* eslint no-unused-vars: 0 */

import React, { Component } from 'react';
import ItemList from './ItemList'

import _ from 'lodash'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  matchPath,
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
  UserCenter,
} from './routes'

import ScrollToTop from './components/ScrollToTop'

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
      inputedTerm: '',
      debug: true,
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.submitOrders = this.submitOrders.bind(this)
  }
  componentDidMount() {
    this.getHomeData()
      .then(home => this.setState({ home }))
    this.getLoginedUser()
      .then(user => {
        if (user) {
          this.setState({ logined: true, user })
        }
      })
  }
  componentWillReceiveProps(nextProps) {
    // 如果Route跳转目标
    //    不是'/product-show'，就清空搜索关键字
    //    是'/produt-show', 使用location.state.term更新关键字
    let matched = matchPath(nextProps.location.pathname, {path: '/product-show'})
    this.setState({inputedTerm: (matched && nextProps.location.state && nextProps.location.state.term) || ''})
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('App ask should update')
  //   return true
  // }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('App will update')
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('App updated')
  // }

  login(data) {
    fetch('/api/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log('logined user:', user)
          // 登录成功
          this.setState({
            logined: true,
            user
          })
        })
      } else {
        res.json().then(console.error)
      }
    }).catch(console.error)
  }

  logout() {
    fetch('signout', {
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        // 退出成功
        this.setState({ logined: false })
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

  getLoginedUser() {
    return fetch('/users/logined')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return console.log('no logined user')
        }
      })
      .catch(console.error)
  }

  render() {
    let {
      logined,
      cart,
      user,
      home,
    } = this.state
    if (!home) return null

    return (
      <div className="app">
        {this.state.debug && <DevIndex />}
        <Header {...{logined, cart, app: this, term: this.state.inputedTerm}}/>
        <div className="wrapper" style={{ minHeight: 440 }}>
          <Route path="/" exact render={props => (
            <Home {...props} data={home} app={this} />
          )} />
          <Route path="/signin" render={props => (
            <Signin {...props} login={this.login} isLogined={this.state.logined} />
          )} />
          <Route path="/product-show" render={props => (
            <ProductShow {...props} addToCart={this.addToCart} app={this} />
          )} />

          <PrivateRoute path="/cart-details" component={CartDetails}
            isAuthed={logined} cart={cart} app={this} />
          <PrivateRoute path="/user-center" component={UserCenter}
            isAuthed={logined} user={user} />

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

const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthed ? (
      <Component {...props} {...rest}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const AppWithRouter = withRouter(App)

const AddedRouterApp = () => {
  return (
    <Router>
      <ScrollToTop>
        <AppWithRouter />
      </ScrollToTop>
    </Router>
  )
}

export default AddedRouterApp;
