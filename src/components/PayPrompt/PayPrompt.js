import React from 'react'
import { Collapse } from 'antd'
import './PayPrompt.css'

class PayPrompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payType: '',
      msg: '',
      msgTimer: null,
    }
  }
  validate() {
    let { payType } = this.state
    if (payType === '') {
      return this.sendMsg('请选择一种支付方式')
    }
    return this.toPay()
  }
  sendMsg(msg, wait = 3000) {
    let { msgTimer } = this.state
    this.setState({
      msg,
      msgTimer: setTimeout(() => {
        this.setState({ msg: '' })
      }, wait)
    })
  }
  toPay() {
    // 调用后端api 'orders/pay',
    // 调用数据组成
    // {
    //   _id: String,
    //   payType: String,
    //   payDate: Number,
    // }
    let orders = this.props.location.state.orders

    let payedOrders = orders.map(order => ({
      _id: order._id,
      paymentType: this.state.payType,
      paymentDate: Date.now(),
    }))

    fetch('/orders/pay', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payedOrders),
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          // 跳转到支付完成页面
          let paymentTotal = orders.reduce((sum, order) => (sum += order.realPay), 0)
          this.setState({ orders: null })
          this.props.history.push('/pay-completed', { paymentTotal })
          // res.json().then(console.log)
        } else {
          // 提示支付失败
        }
      })
      // 提示请求失败
      .catch(console.error)
    // setTimeout(() => {
    //   this.sendMsg('支付完成！')
    // }, 500)
  }

  render() {
    let { location } = this.props
    let orders = location && location.state && location.state.orders
    if (!(orders && orders.length)) {
      this.props.history.replace('/')
      return null
    }
    let { msg } = this.state
    // 暂时只处理一个订单
    let order = orders && orders[0]

    return (
      <div className="pay-prompt">
        <div className="wrapper">
          <div className="prompt-msg">
            <h3 className="title">
              提交订单成功
            </h3>
            <p>请在24小时内完成支付, 超时订单将自动取消。</p>
            <p>我们将在您完成支付后的72小时内发货。</p>
          </div>
          <div className="pay-type">
            <h3 className="title">支付方式</h3>
            <div className="types">
              {/*
                <div key="1" className={'type-item ' + (this.state.payType === 1) ? } onClick={this.setState({payType: '1'})} >
                  <img src={'/alipay@2x.png'} alt=""/>
                </div>
                <div key="2" className={'type-item ' + (this.state.payType === 2)} onClick={this.setState({payType: '2'})} >
                  <img src={'/weixinpay@2x.png'} alt=""/>
                </div>
              */}
              {[
                { url: '/alipay@2x.png', value: 'alipay' },
                { url: '/weixinpay@2x.png', value: 'weixinpay' },
              ].map((opt, idx) => (
                <div key={opt.value} className={'type-item ' + (this.state.payType === opt.value ? 'active' : '')}
                  onClick={() => this.setState({ payType: opt.value })}>
                  <img src={opt.url} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="pay-footer clearfix">
            <div className="footer-wrap fr">
              <span className="pay-amount">
                <span className="title">应付金额：</span>
                <span className="price">
                  ￥<span className="num">{order.realPay}</span>
                </span>
              </span>
              <span className="btn btn-primary" onClick={() => this.validate()}>立即付款</span>
              {msg && (<p className="feedback">{msg}</p>)}
              {/*
                {true && (<p className="feedback">{msg || '提示信息'}</p>)}
              */}
            </div>
          </div>
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel key="1" header={<div>订单编号：{order._id}</div>}>
              {/*
              <div className="clearfix mb-10">
                <span className="order-serial fl">订单编号: xxxxx</span>
                <a className="toggle fr">展开订单信息</a>
              </div>
              */}
              <div className="order-abstract">
                <div className="abstract-wrap clearfix mb-20">
                  <div className="order-addr mb-20">
                    <div className="title mb-10">
                      收货信息
                    </div>
                    <p className="detail">姓名：</p>
                    <p className="detail">联系电话：</p>
                    <p className="detail">详细信息: </p>
                  </div>
                  <div className="order-items">
                    <div className="tr desc-wrap mb-10">
                      <span className="th desc-info">商品信息</span>
                      <span className="th desc-price">
                        单价
                      </span>
                      <span className="th desc-amount">
                        数量
                      </span>
                      <span className="th desc-sum">
                        小计
                      </span>
                    </div>
                    <div className="items-wrap mb-20">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="tr item-content">
                          <div className="td cell-info">{item.content.title}</div>
                          <div className="td cell-price">￥{item.content.price}</div>
                          <div className="td cell-amount">{item.amount}</div>
                          <div className="td cell-sum">￥{item.realPay}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="order-summary fr">
                    <p>商品总计：￥{order.price}</p>
                    <p>+ 运费：￥{order.shipping}</p>
                    <p>实际付款：￥{order.realPay}</p>
                  </div>
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default PayPrompt
