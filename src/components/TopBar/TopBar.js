import React, { Component, PropTypes } from 'react'

import { Link } from 'react-router-dom'

import './TopBar.css'

let userMenuItems = [
  {
    content: '我的订单',
    to: '/usercenter/order-history',
  },
  {
    content: '收藏夹',
    to: '/usercenter/favorites',
  },
]

const TopBar = ({ cart }) => {

  return (
    <div className="topbar">
      <div className="logo">
      </div>
      <div className="login-btn"></div>
      <div className="signup-btn"></div>
      <div className="cart-dropdown">
        cart
      </div>
      <div className="user-dropdown">
        user
      </div>
    </div>
  )
}

const UserMenuItem = ({ to, content }) => {
  return (
    <li style={{ lineHeight: '3em' }}>
      <Link to={to}>
        {content}
      </Link>
    </li>
  )
}
