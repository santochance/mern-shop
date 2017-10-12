import React, { PropTypes } from 'react'

const ProductItem = (props) => {
  let { item, key, hovering } = props
  return (
    <div className="product-item">
      <div className="product-pic">
        <a href="" className="pic-wrapper">
          <img style={{ width: '100%', height: '100%' }} src={'/01.jpg'} alt=""/>
        </a>
      </div>
      <div className="product-info">
        <a href="" className="product-title">
          {item.title || item.productName}
        </a>
        <div className="product-desc">
          {item.description}
        </div>
        {key === hovering ? (
          <div className="product-price">
            <span>￥ {item.price}</span>
          </div>
        ) : (
          <div className="product-operation">
            <button className="btn btn-primary">加入购物车</button>
          </div>
        )}
      </div>
    </div>
  )
}


export default ProductItem
