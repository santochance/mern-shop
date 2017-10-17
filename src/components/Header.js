import React from 'react'
import { Popover, Icon } from 'antd'

import { cart, cartAPI } from '../fakeData/mock-cart'

import '../CartItem.css'
import '../CartFooter.css'

class Header extends React.Component {

  render() {
    return (
      <header className="top-header">
        <div className="nav-logo"></div>
        <div className="right-box">
          <Popover content={<CartSummary cart={cart} cartAPI={cartAPI} />} >
            <Icon type="shopping-cart" style={{ fontSize: 20 }} />
          }
          </Popover>
        </div>
      </header>
    )
  }
}

/*
  暂时使用全局变量
 */
const CartSummary = (/* { cart, cartAPI } */) => {

  return (
    <div className="cart-summary" style={{ width: 360 }}>
      <div className="cart-content">
        {cart.children.map((order, idx) => (
          <CartOrder>
            {order.children.map((item, idx) => (
              <CartItem entry={item} removeItem={cartAPI.removeItem} />
            ))}
          </CartOrder>
        ))}
        {/*
        <CartOrder>
          <CartItem entry={item} />
          <CartItem entry={item} />
        </CartOrder>
        */}
      </div>
      <CartFooter price={cart.price} amount={cart.count} />
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

const CartItem = ({ entry, removeItem }) => {

  return (
    <div className="cart-item">
      <div className="item-content tr">
        <div className="cell-pic td">
          <div className="pic-wrapper">
            <img src={entry.content.imageUrl} alt=""/>
          </div>
        </div>
        <div className="cell-info td">
          <div className="info-title">
            <a href="">
              {entry.content.productName}
            </a>
          </div>
          <div className="info-desc">{entry.content.description}</div>
          <div>
            <span className="price-symbol">￥</span>
            <span className="price">{entry.content.price}</span>
            <span className="sep-symbol">x</span>
            <span className="amount">{entry.amount}</span>
          </div>
        </div>
        <div className="cell-oper td">
          <span className="delete-btn" title="删除商品" onClick={removeItem}>
            <Icon type={'close-circle-o'} />
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
          <span className="itemCount">{amount}</span>
          <span className="text">项商品</span>
        </div>
        <div className="price-sum">
          <span className="text">合计：</span>
          <span className="price">
            <span className="totalSymbol">￥</span>
            <span className="total">{price}</span>
          </span>
        </div>
      </div>
      <div className="right-box">
        <a className="btn btn-info" href="#">
          去购物车
        </a>
      </div>
    </div>
  )
}

export { CartSummary }

export default Header
