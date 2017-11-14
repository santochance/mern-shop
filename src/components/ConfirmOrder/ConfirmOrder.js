import React from 'react'
import { Link } from 'react-router-dom'
import Selector from './Selector'
import './ConfirmOrder.css'
// import './ConfirmOrder2.css'

let mockAddresses = [
  {
    name: '黄先生',
    addr: '广东省 深圳市 龙华新区 民治塘水围新村x区x幢xxxx',
    phone: '138xxxx7697'
  },
  {
    name: '黄先生',
    addr: '广东省 广州市 番禺区 广州大学城x区x幢xxxx',
    phone: '138xxxx7697'
  }
]

let selectedAddr = mockAddresses[0]

const ConfirmOrder = ({ app, cart, addresses, user }) => {

  return (
    <section className="confirm-order">
      <div className="wrapper">
        <div className="order-address">
          <Selector options={mockAddresses} onClick={(opt) => {
            selectedAddr = opt
            app.forceUpdate()
          }}/>
        </div>
        <div className="order-orderDesc">
          <div className="title">确认订单信息</div>
          <div className="tr desc-row">
            <div className="th desc-info">商品信息</div>
            <div className="th desc-param">商品属性</div>
            <div className="th desc-price">单价</div>
            <div className="th desc-amount">数量</div>
            <div className="th desc-discount">优惠</div>
            <div className="th desc-sum">小计</div>
          </div>
        </div>
        <div className="order-list">
          {cart.children.map((order, i) => order.count > 0 && (
            <div key={i} className="order-content">
              {/*
              <div className="order-shopInfo">
                <span className="badge">badge</span>
                <span className="shop-name">Shop Name</span>
                <span className="shop-seller">Seller</span>
              </div>
              */}
              <div className="order-items">
                {order.children.map((item, i) => item.checked && (
                  <div key={i} className="tr item-content">
                    <div className="td cell-info">
                      <div className="info-image">
                        <Link to={`/product-details/${item.content._id || item.content.objectId}`} className="image-wrapper" href="">
                          <img src={item.content.imageUrl} alt=""/>
                        </Link>
                      </div>
                      <div className="info-content">
                        <div className="info-title">
                          <Link to={`/product-details/${item.content._id || item.content.objectId}`} className='link'>{item.content.title}</Link>
                        </div>
                        <div className="info-icons"></div>
                      </div>
                    </div>
                    <div className="td cell-param"></div>
                    <div className="td cell-price">{item.content.price}</div>
                    <div className="td cell-amount">{item.amount}</div>
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
                  <div className="delivery-method">
                    <span className="title">运送方式：</span>
                    <span className="method-name">普通配送</span>
                  </div>
                  <div className="delivery-price">
                    <span className="title">运费：</span>
                    <span className="price-num">{order.shipping}</span>
                  </div>
                </div>
              </div>
              <div className="order-total">
                <span>合计：(含运费)</span>
                <span className="order-sum">￥{order.realPay}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="order-payInfo">
          <div className="payInfo-wrapper">
            <div className="payInfo-shadow">
              <div className="order-realPay">
                <strong className="realPay-title">实付款：</strong>
                <span className="realPay-currency">￥</span>
                <span className="realPay-price">{cart.realPay}</span>
              </div>
              <div className="order-confirmAddr">
                <div className="confirmAddr-addr">
                  <strong className="confirmAddr-title">寄送至：</strong>
                  <span className="confirmAddr-bd">
                    {selectedAddr.addr}
                  </span>
                </div>
                <div className="confirmAddr-user">
                  <strong className="confirmAddr-title">收货人：</strong>
                  <span className="confirmAddr-bd">{selectedAddr.name} {selectedAddr.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-submitOrder">
          <div className="submitOrder-wrapper">
            {/*
            <Link to="/cart-details" className="go-back">返回购物车</Link>
            */}
            <button href="" className="btn btn-danger go-submit"
              onClick={() => app.submitOrders({ address: selectedAddr })}>提交订单</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConfirmOrder
