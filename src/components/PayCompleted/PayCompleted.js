import React from 'react'
import { Link } from 'react-router-dom'

import './PayCompleted.css'

const PayCompleted = (props) => {
  let paymentTotal = props.location && props.location.state && props.location.state.paymentTotal
  if (!paymentTotal) {
    props.history.replace('/')
    return null
  }
  return (
    <div className="pay-completed">
      <div className="wrapper">
        <div className="main-msg">
          您已经付款成功！总共花费<span className="pay-num">￥{paymentTotal}</span>元
        </div>
        <div className="nav-links">
          <Link className="btn" to="/user-center">查看订单</Link>
          <Link className="btn btn-primary" to="/">继续选购</Link>
        </div>
      </div>
    </div>
  )
}

export default PayCompleted
