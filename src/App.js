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
  Header,
  SiteNav,
  Signin,
  CartDetails,
  ConfirmOrder,
} from './routes'

import './assets/style/index.css'
import './App.css'

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
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      cart: this.state.itemlist,
      logined: false,
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
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

  render() {
    let {
      logined,
      cart,
    } = this.state

    return (
      <div className="app">
        <DevIndex />
        <Header {...{logined, cart, app: this}}/>
        {/*
          <SiteNav {...{logined, logout: this.login}} />
        */}
        <div className="wrapper">
          <Route path="/signin" render={props => (
            <Signin login={this.login} />
          )} />
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
          <Route path="/confirm-order" render={props => (
            <ConfirmOrder {...props} cart={cart} />
          )} />
          {/* Other Routes */}
          {routes.map((route, idx) => (
            <Route key={idx} {...route} />
          ))}
        </div>
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
