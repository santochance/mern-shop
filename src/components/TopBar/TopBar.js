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
        <div className="cart-summary" style={{
          position: 'absolute';
          width: 300;

        }}>
          <CartSummary cart={cart} />
        </div>
      </div>
      <div className="user-dropdown">
        {(hovering) && (
          <ul className="user-summary" style={{
            minWidth: 80
          }}>
            {userMenuItems.map((item, idx) => (
              <UserMenuItem {...item} />
            ))}
          </ul>
        )}
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
