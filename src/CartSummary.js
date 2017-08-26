import React, { Component } from 'react'

export default class CartSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      count: 0,
      total: 0,
    }
  }
  
  render() {
    return (
      <div className="cart-summary">
        <header>
          <a href="" className="check-cart">查看购物车</a>
        </header>
        <article>
          <ul>
            {items.map(() => (
              <li>
                <img className="thumbnail" />
                <div className="title"></div>
                <input type="number" value="3" />
              </li>
            ))}
          </ul>
        </article>
        <foot>
          合计：<span>{count}</span>
          <button>立即结算</button>
        </foot>
      </div>
    )
  }
}