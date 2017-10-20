import React from 'react'
import PropTypes from 'prop-types'

import './CardGrid.css'


const CartGrid = ({ items }) => {

  return (
    <div className="card-grid">
      <header className="grid-hd">
        <h1 className="title">Title</h1>
        <a className="more" href="">查看更多</a>
      </header>
      <div className="grid-bd">
        <div className="items">
          {items.map((item, idx) => (
            <div key={idx} className="item col-5">
              <a href="#">
                <img src="" alt=""/>
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
                <div className="price">
                  ￥{item.price}
                  <span className="old-price">￥{item.oldPrice}</span>
                </div>
                <div className="sales">
                  已售：{item.sales}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <footer className="grid-ft"></footer>
    </div>
  )
}

export default CartGrid




