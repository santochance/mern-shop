import React, { Component, PropTypes } from 'react'

const ConfirmOrder = ({ cart, selectedAddr }) => {

  return (
    <div className="order-confirm">
      <div className="order-address"></div>
      <div className="order-orderDesc">
        <div>确认订单</div>
        <div className="tr desc-row">
          <div className="th desc-info">商品信息</div>
          <div className="th desc-param">商品属性</div>
          <div className="th desc-price">单价</div>
          <div className="th desc-quantity">数量</div>
          <div className="th desc-discount">优惠</div>
          <div className="th desc-sum">小计</div>
        </div>
      </div>
      <div className="order-list">
        {cart.children.map((order, i) => order.count > 0 && (
          <div key={i} className="order-content">
            <div className="order-shopInfo">
              <span className="badge">badge</span>
              <span className="shop-name">Shop Name</span>
              <span className="shop-seller">Seller</span>
            </div>
            <div className="order-items">
              {order.children.map((item, i) => item.checked && (
                <div key={i} className="tr item-content">
                  <div className="td cell-info">
                    <div className="td cell-image">
                      <a className="image-wrapper" href="">
                        <img src="" alt=""/>
                      </a>
                    </div>
                    <div className="td info-content">
                      <div className="td cell-title">{item.content.productName}</div>
                      <div className="td cell-icons"></div>
                    </div>
                  </div>
                  <div className="td cell-param"></div>
                  <div className="td cell-price">{item.content.price}</div>
                  <div className="td cell-quantity">{item.amount}</div>
                  <div className="td cell-discount">{item.discount}</div>
                  <div className="td cell-sum">{item.price}</div>
                </div>
              ))}
            </div>
            <div className="order-ext">
              <div className="order-message">
                <span className="message-name">给卖家留言：</span>
                <span className="message-detail">
                  <input type="text"/>
                </span>
              </div>
              <div className="order-delivery">
                <div className="delivery-title">
                  运送方式：
                </div>
                <div className="delivery-select">
                  <span className="select-info">普通配送</span>
                  <span className="select-price">{order.shipping}</span>
                </div>
              </div>
            </div>
            <div className="order-total">
              <span>(含运费)</span>
              <span className="order-sum">￥{order.realPay}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="order-payInfo">
        <div className="payInfo-wrapper">
          <div className="order-realPay">
            <strong className="realPay-title">实付款：</strong>
            <span className="realPay-currency">￥</span>
            <span className="realPay-price">{cart.realPay}</span>
          </div>
          <div className="order-confirmAddr">
            <div className="confirmAddr-addr">
              <strong className="confirmAddr-title">寄送至：</strong>
              <span className="confirmAddr-bd">
                {selectedAddr}
              </span>
            </div>
            <div className="confirmAddr-user">
              <strong className="confirmAddr-title">收货人：</strong>
              <span className="confirmAddr-bd">User Info...</span>
            </div>
          </div>
        </div>
      </div>
      <div className="order-submitOrder">
        <div className="submitOrder-wrapper">
          <a href="#" className="go-back">返回购物车</a>
          <a href="" className="btn btn-danger go-submit"
            onClick={() => this.submitOrder()}>提交订单</a>
        </div>
      </div>
    </div>
  )
}

ConfirmOrder.propTypes = {
  cart: PropTypes.object,
  selectedAddr: PropTypes.object,
}

export default ConfirmOrder
