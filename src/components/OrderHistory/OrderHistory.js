import React from 'react'
import { Link } from 'react-router-dom'

import Page from '../../helper/page.js'

import './OrderHistory.css'

let statusMap = {
  'pending': '准备中',
  'created': '未付款',
  'paid': '已付款',
}

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    this.loadData('/orders')
      .then(orders => console.log('orders:', orders) || orders)
      .then(orders => Object.assign(this, { page: new Page(orders, 4) }))
      .then(() => this.setState({...this.state}))
      .catch(console.error)

    window.orderHistory = this
  }

  // loadData
  loadData(url, query) {
    if (query) {
      let querySegs = []
      if (Array.isArray(query)) {
        querySegs = query
      } else if ({}.toString.call(query).slice(8, -1) === 'Object') {
        querySegs = Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
      } else {
        querySegs = Array.from(arguments).slice(1)
      }

      let queryStr = querySegs.join('&')
      queryStr && (
        url += '?' + encodeURI(queryStr)
      )
    }

    return new Promise((resolve, reject) =>
      fetch(url, {
      credentials: 'include'
      })
        .then(res => {
          if (res.ok) {
            res.json().then(data => resolve(data))
          } else {
            reject(res)
          }
        })
        .catch(err => reject(err))
    )
  }

  render () {
    // debugger
    let { page } = this

    if (!page) {
      return null
    }

    let {
      data: orders = [],
      index,
      indexKeys = []
    } = page

    if (!orders.length) {
      return (
        <div className="order-history">
          <div className="wrapper">
            <div className="history-empty">
              你还没有创建任何的订单
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="order-history">
        <div className="wrapper">
          <div className="desc-header"></div>
          <div className="nav-direction"></div>
          {/*
          <div className="main-content">
            {orders.map(order => (
              <div>{JSON.stringify(order, null, 2)}</div>
            ))}
          </div>
          */}
          <TableView page={page} orders={orders} />
          {/*
          <Pagination indexKeys={indexKeys} index={index}
            gotoPage={(index) => page.goto(index)} />
          */}
          <Pagination page={page} />
        </div>
      </div>
    )
  }
  //
}

const Pagination = (props) => {
  let { page } = props
  let { index, indexKeys } = page
  let prevLabel = '\u00AB'
  let nextLabel = '\u00BB'

  return (
    <div className="Page navigation" style={{ textAlign: 'right' }}>
      <ul className="pagination" style={{ display: 'inline-block', textAlign: 'left' }}>
        <li className={indexKeys.prev || 'disabled'}>
          <a href={'#'} aria-label="Previous" onClick={() => page.goto(index - 1)}>
            <span aria-hidden="true">{prevLabel}</span>
          </a>
        </li>
        {indexKeys.all.slice(1, -1).map((key, i) =>
          (key === '...') ? (
            <span key={i} style={{float: 'left', padding: '6px 12px'}}>{key}</span>
          ) : (
            <li key={i} className={typeof key === 'string' && 'active'}
              onClick={() => page.goto(parseInt(key) - 1)}>
              <a href={'#'}>{key}</a>
            </li>
          )
        )}
        <li className={indexKeys.next || 'disabled'}
          onClick={() => page.goto(index + 1)}>
          <a href={'#'} aria-label="Next">
            <span aria-hidden="true">{nextLabel}</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

const TableView = (props) => {
  let { page, orders } = props

  return (
    <div className="table-view">
      <div>
        {/* 字段标题栏 */}
        <div className="history-orderDesc">
          <div className="th desc-product">商品信息</div>
          <div className="th desc-price">单价</div>
          <div className="th desc-amount">数量</div>
          <div className="th desc-oper">商品操作</div>
          <div className="th desc-realPay">实付款</div>
          <div className="th desc-status">交易状态</div>
        </div>
        <div className="nav-row">
          <a href="#" className={'btn btn-default btn-sm' + (!page.indexKeys.prev ? ' disabled' : '')} onClick={() => page.prev()}>上一页</a>
          <a href="#" className={'btn btn-default btn-sm' + (!page.indexKeys.next ? ' disabled' : '')} onClick={() => page.next()}>下一页</a>
        </div>
        <div className="history-orders">
          {orders.map((order, i) =>
            <div key={i} className="order-content">
              <div className="thead">
                {/* 订单信息栏 */}
                <div className="order-info">
                  <span className="order-date">
                    {<order className="created">{new Date(order.createdAt).format('yyyy-MM-dd hh:mm:ss')}</order>}
                  </span>
                  <span className="order-serial">
                  订单编号：{order._id || order.objectId}
                  </span>
                </div>
                {/*
                <div className="order-seller">卖家：{order.seller}</div>
                */}
              </div>
              <div className="tbody">
                {order.items.map((item, i) =>
                  <div key={i} className="tr item-content">
                    <div className="td cell-product">
                      <div className="td product-image">
                        <Link to={`/product-details/${item.content._id || item.content.objectId}`}>
                          <img src={item.content.imageUrl} alt=""/>
                        </Link>
                      </div>
                      <div className="td product-info">
                        <Link to={`/product-details/${item.content._id || item.content.objectId}`} className="link-tn" href="">{item.content.title}</Link>
                      </div>
                    </div>
                    <div className="td cell-price">￥{item.content.price || 'xxx.xx'}</div>
                    <div className="td cell-amount">{item.amount}</div>
                    <div className="td cell-oper">
                      {['paid'].indexOf(order.status) >= 0 && (<a href="#">退款</a>)}
                    </div>
                    {i === 0 ? (
                      [
                        <div key="0" className="td cell-realPay">￥{order.realPay}</div>,
                        <div key="1" className="td cell-status">{order.status ? statusMap[order.status] : '订单状态'}</div>
                      ]
                    ) : (
                      /*
                      Array(2).fill().map((v, i) =>
                        <div key={i} className={`td cell-empty-${i}`}>'Empty'</div>
                      )
                       */
                      [
                        <div key="0" className="td cell-realPay"></div>,
                        <div key="1" className="td cell-status"></div>
                      ]
                    )}

                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default OrderHistory
