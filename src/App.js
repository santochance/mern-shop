/* eslint no-unused-vars: 0 */

import React, { Component } from 'react';
// import logo from './logo.svg';
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

class App extends Component {
  state = {}

  render() {
    let { cart, expanded } = this.state

    return (
      <Router>
        <div className="App">
          <DevIndex />
          <SiteNav />
          <div className="page">
            {routes.map((route, idx) => (
              <Route {...route} />
            ))}
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
