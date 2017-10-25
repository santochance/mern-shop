import React from 'react'
import PropTypes from 'prop-types'

import './CardGrid.css'

const CartGrid = ({ items }) => {
  return (
    <div className="card-grid">
      <header className="grid-hd">
        <h1 className="title">热销商品</h1>
        <a className="more" href="">查看更多 ></a>
      </header>
      <div className="grid-bd-2">
        <div className="items">
          {items.map((item, idx) => (
            <CardB key={idx} item={item} className="item col-5" />
          ))}
        </div>
      </div>
      <div className="grid-bd" style={{ display: 'none' }}>
        <div className="items">
          {items.map((item, idx) => (
            <CardA key={idx} className="item col-4" item={item} />
          ))}
        </div>
      </div>
      <footer className="grid-ft"></footer>
    </div>
  )
}

const CardA = ({item, className}) => {
  return (
    <div className={className}>
      <div className="wrap">
        <a href="#">
          <img src={'/02.jpg'} alt=""/>
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
    </div>
  )
}

const CardB = ({item, className}) => {
  return (
    <div className={className}>
      <div className="wrap">
        <div className="content">
          <a href="#" className="top">
            <img src={'/02.jpg'} alt=""/>
            <div className="price">￥{item.price}</div>
            <div className="desc" title={item.desc}>
              <a href="#">
                {item.desc}
              </a>
            </div>
          </a>
          <div className="title" title={item.title}>
            {item.title}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartGrid
