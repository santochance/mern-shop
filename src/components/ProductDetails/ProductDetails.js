import React from 'react'
import './ProductDetails.css'

const ProductDetails = () => {

  return (
    <div className="product-details-page wrapper">
      <div className="product-intro">
        <div className="left">
          图片预览
        </div>
        <div className="right">
          <div className="product-header">
            <div className="product-name">
              商品名称
            </div>
            <div className="desc-wrapper flex-lr-ab">
              <span className="product-descrp">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione aut, architecto sit nesciunt, optio ut molestias eaque deleniti molestiae...
              </span>
            </div>
          </div>
          <div className="product-price">
            <span className="now-price">
              <span className="symbol">￥</span>
              <span className="num">1999</span>
            </span>
            <span className="old-price">
              <span className="symbol">￥</span>
              <span className="num">2599</span>
            </span>
          </div>
          <div className="product-data">
            <span className="comment">
              <span className="text">累计评论</span>
              <span className="num">130</span>
            </span>
            <span className="sales">
              <span className="text">成功交易</span>
              <span className="num">40</span>
            </span>
          </div>
          <div className="product-choice">
            <div className="choice-amount">
              数量：
              <input type="number" name="" id="" value="30" />
            </div>
          </div>
          <div className="product-op">
            <button className="btn btn-default">现在购买</button>
            <button className="btn btn-primary">加入购物车</button>
          </div>
        </div>
      </div>
      <div className="product-parti">
        <div>
          这里放一个tab组件...
        </div>
      </div>
    </div>
  )
  // return (
  //   <div>Hello！</div>
  // )
}

export default ProductDetails
