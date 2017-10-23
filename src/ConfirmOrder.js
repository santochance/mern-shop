import React from 'react'

import './ConfirmOrder.css'

import fakeData from './fakeData/fakeData-Order.js'

let { addrs, orders } = fakeData

class ConfirmOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitDisabled: false,
      addresses: addrs,
      usedAddr: addrs[2],
      buyer: 'current user', // 当前用户
      orders: orders,
      realPay: orders.reduce((sum, order) => (sum += order.total), 0),
      paymentType: '', // 选择支付方式
    }
  }

  splitOrders(joinedOrder) {
    return joinedOrder.orders.map(order => {
      return {
        ...order,
        buyer: joinedOrder.buyer,
        address: joinedOrder.usedAddr,
        realPay: order.total,
        paymentType: joinedOrder.paymentType,
      }
    })
  }

  submitOrder() {
    let state = this.state
    let orders = this.splitOrders(state)
    this.setState({ ...state, submitDisabled: true })

    console.log('sending orders:', orders)

    fetch('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orders)
    }).then((res) => res.json())
      .then(console.log)
      .catch(console.error)
  }

  render() {
    let { addresses, usedAddr, orders, realPay } = this.state

    console.log('usedAddr is:', usedAddr)
    return (
      <div className="order-confirm">
        <div className="order-stepbar">
          <img src="" alt="" className="logo" />
          <span>Status Bar</span>
        </div>
        <div className="order-address">
          <fieldset>
            {addresses.map((addr, i) => (
              <div key={i} className="">
                <div className="marker">
                  寄送至
                </div>
                <label style={{outline: '1px solid black'}}>
                  <input type="radio" name="address" id="" value={i} checked={addr === usedAddr}
                    onChange={(e) => this.setState({...this.state, usedAddr: addr})} />
                  {addr.addr} {addr.name} {addr.tel}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        {/* 结构固定在view内，没必要动态生成 */}
        <div className="order-orderDesc">
          <div>确认订单</div>
          <div className="tr">
            <div className="th cell-info">商品信息</div>
            <div className="th cell-prop">商品属性</div>
            <div className="th cell-price">单价</div>
            <div className="th cell-amount">数量</div>
            <div className="th cell-discount">优惠</div>
            <div className="th cell-total">小计</div>
          </div>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="order-orderInfo">
            <div className="order-shopInfo">
              <div className="shop-name">Seller</div>
            </div>
            {order.items.map((item, index) => (
              <div key={index} className="tr order-item">
                <div className="td cell-prodInfo">
                 <img className="td cell-img" src={item.content.imageUrl} alt="" />
                  <div className="td cell-title">{item.content.title}</div>
                  <div className="td cell-prop">Prop</div>
                </div>
                <div className="td cell-price">{item.price}</div>
                <div className="td cell-amount">{item.amount}</div>
                <div className="td cell-discount">{item.discount}</div>
                <div className="td cell-total">{item.total}</div>
              </div>
            ))}
            <div className="order-message">给卖家的留言：{order.message}</div>
            <div className="order-shipping">运费：<span>{order.shipping}</span></div>
            <div className="order-payment">店铺合计（含运费）<span>{order.total}</span></div>
          </div>
        ))}
        <div className="order-payInfo">
          <div className="payInfo-wrap">
            <div className="order-realPay">
              <span className="realPay-title">实付款：</span>
              <span>{realPay}</span>
            </div>
            <div className="order-confirmAddr">
              <span className="confirmAddr-title">寄送至：</span>{usedAddr.addr}
              <span className="confirmAddr-title">收货人：</span>{usedAddr.name}
            </div>
          </div>
        </div>

        <div className="order-submitOrder">
          <button>返回购物车</button>
          <button className="btn btn-error"
            onClick={() => this.submitOrder()}
            disabled={this.state.submitDisabled}>提交订单</button>
        </div>
      </div>
    )
  }
}

export default ConfirmOrder
