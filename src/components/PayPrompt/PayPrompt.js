import React from 'react'
import { Collapse } from 'antd'
import './PayPrompt.css'

const PayPrompt = (props) => {
  let orders = props.location.state.orders
  if (orders && orders.length) {
    // 重写向到首页
    // props.history.push('/')
  }

  // 暂时只处理一个订单
  let order = orders[0]
  let payType = null

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
            <span>
              <span className="icon"></span>
              <span className="text">支付宝</span>
            </span>
            <span>
              <span className="icon"></span>
              <span className="text">微信支付</span>
            </span>
            */}
            <div className="type-item">
              <img src={'/alipay@2x.png'} alt=""/>
            </div>
            <div className="type-item">
              <img src={'/weixinpay@2x.png'} alt=""/>
            </div>
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
            <span className="btn btn-primary">立即付款</span>
          </div>
        </div>
        <Collapse>
          <Collapse.Panel header={<div>订单编号：{order._id}</div>}>
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
                        <div className="td cell-info">{item.product.title}</div>
                        <div className="td cell-price">￥{item.product.price}</div>
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

export default PayPrompt
