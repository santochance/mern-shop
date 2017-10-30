import React from 'react'
import { Popover, Icon, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
// import { cart, cartAPI } from '../fakeData/mock-cart'

import './Header.css'

const Header = ({ logined, cart, app }) => {

  return (
    <header className="top-header">
      <div className="wrapper">
        <div className="left-box">
          <div className="nav-brand">
            <h1 className="logo">
              <Link to="/">
                <img src="/logo.png" alt="Electronic-Shop"/>
              </Link>
            </h1>
          </div>
        </div>
        <div className="middle-box">
          <form className="search-bar" style={{
            width: 400,
            position: 'relative',
            zIndex: '9999',
          }}>
            <input type="text"/>
            <button><Icon type="search" style={{ fontSize: 18 }} /></button>
            {/*
            <button className="icon">搜&nbsp;索</button>
            */}
          </form>
        </div>
        <div className="right-box">
          {!logined && (
            <div className="nav-btns">
              <Link to="/signin" className="btn btn-primary">登&nbsp;录</Link>
              <Link to="/signup_0" className="btn btn-success">注&nbsp;册</Link>
            </div>
          )}
          <div className="nav-aside">
            {logined && (
              <div className="user">
                <Popover placement={'bottom'} content={
                  <UserMenu logout={app.logout} />
                }>
                  <Icon className="user-icon" type="user"/>
                </Popover>
              </div>
            )}
            <div className="cart">
              <Popover placement={'bottomRight'} content={
                <CartSummary cart={cart} app={app} />
              }>
                <Icon className="cart-icon" type="shopping-cart"/>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/*
  暂时使用全局变量
 */
const CartSummary = ({ cart, app }) => {

  let isEmpty = cart.children && !cart.children.length

  return (
    <div className="cart-summary">
      <div className="cart-wrapper" style={{
        width: 360,
        margin: '-8px -16px'
      }}>
        {isEmpty ? (
          <div className="cart-empty" style={{ textAlign: 'center', padding: '40px 0' }}>
            <span>购物车是空空的，去看看心仪的商品吧~</span>
          </div>
        ) : (
          <div className="cart-content">
            {cart.children.map((order, idx) => (
              <CartOrder>
                {order.children.map((item, idx) => (
                  <CartItem key={idx} entry={item} removeItem={app.removeItem} />
                ))}
              </CartOrder>
            ))}
          </div>
        )}
        <CartFooter price={cart.price} amount={cart.count} />
      </div>
    </div>
  )
}

const CartOrder = ({ children, content }) => {

  return (
    <div className="cart-order">
      {content ? (
        {content}
      ) : (
        <div className="order-content">
          {children}
        </div>
      )}
    </div>
  )
}

const CartItem = ({ entry, removeItem, key }) => {

  return (
    <div className="cart-item">
      <div className="item-content tr">
        <div className="cell-pic td">
          <div className="pic-wrapper">
            <a href="">
              <img src={entry.content.imageUrl} alt=""/>
            </a>
          </div>
        </div>
        <div className="cell-info td">
          <div className="info-title">
            <a href="" className="link">
              {entry.content.title}
            </a>
          </div>
          <div>
            <span className="price-symbol">￥</span>
            <span className="price">{entry.content.price}</span>
            <span className="sep-symbol">x</span>
            <span className="amount">{entry.amount}</span>
          </div>
        </div>
        <div className="cell-oper td">
          <span className="delete-btn" title="删除商品" onClick={() => removeItem(entry, key)}>
            <Icon className="icon" type={'close-circle-o'} />
          </span>
        </div>
      </div>
    </div>
  )
}

const CartFooter = ({ price, amount }) => {

  return (
    <div className="cart-footer">
      <div className="left-box">
        <div className="amount-sum">
          <span className="text">共</span>
          <span className="itemCount">{amount || 0}</span>
          <span className="text">项商品</span>
        </div>
        <div className="price-sum">
          <span className="text">合计：</span>
          <span className="price">
            <span className="totalSymbol">￥</span>
            <span className="total">{price || 0}</span>
          </span>
        </div>
      </div>
      <div className="right-box">
        <Link to="/cart-details" className="btn btn-info" href="#">
          去购物车
        </Link>
      </div>
    </div>
  )
}

const UserMenu = ({ logout }) => {
  let targetUrl = '/user-center'

  return (
    <div className="user-menu">
      <ul className="menu-wrapper">
        <li className="menu-item">
          <Link className="link" to={`${targetUrl}/`}>
            <Icon className="icon" type="user" />
            <span className="text">用户中心</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link className="link" to={`${targetUrl}/`}>
            <Icon className="icon" type="gift" />
            <span className="text">我的订单</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link className="link" to={`${targetUrl}/favorites`}>
            <Icon className="icon" type="star-o" />
            <span className="text">我的收藏夹</span>
          </Link>
        </li>
        <li className="menu-item">
          <span className="link" onClick={logout}>
            <Icon className="icon" type="logout" />
            <span className="text">退出</span>
          </span>
        </li>
      </ul>
    </div>
  )
}

export { CartSummary }

export default Header
