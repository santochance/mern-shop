import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './CardGrid.css'

const CartGrid = ({ header, items }) => {
  return (
    <div className="card-grid">
      <header className="grid-hd">
        <h1 className="title">{header}</h1>
        <a className="more" href="">查看更多 ></a>
      </header>
      <div className="grid-bd-2">
        <div className="items">
          {items.map((item, idx) => (
            <CardB key={idx} item={item} className="item col-5" />
          ))}
        </div>
      </div>
      {/*
      <div className="grid-bd" style={{ display: 'none' }}>
        <div className="items">
          {items.map((item, idx) => (
            <CardA key={idx} className="item col-4" item={item} />
          ))}
        </div>
      </div>
      */}
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
          <div className="top">
            <Link to={`/product-details/${item._id || item.objectId}`}>
              <img src={item.imageUrl} alt=""/>
            </Link>
            <div className="price">￥{item.price}</div>
            <div className="desc" title={item.description || item.desc}>
              <Link to={`/product-details/${item._id || item.objectId}`}>
                {item.description || item.desc}
              </Link>
            </div>
          </div>
          <div className="title" title={item.title}>
            {item.title}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartGrid
