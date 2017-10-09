import React from 'react'

import Page from './helper/page.js'

import './OrderHistory.css'

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
      fetch(url)
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
      data: orders,
      index,
      indexKeys
    } = page

    return (
      <div className="order-history">
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
    <div className="Page navigation">
      <ul className="pagination">
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
      <div className="main-content">
        <div className="hsitory-orderDesc"></div>
        <div className="nav-row">
          <a href="#" className="btn btn-default" onClick={() => page.prev()}>上一页</a>
          <a href="#" className="btn btn-default" onClick={() => page.next()}>下一页</a>
        </div>
        <div className="history-orders">
          {orders.map((order, i) =>
            <div key={i} className="order-content">
              <div className="thead">
                <div className="cell-orderInfo"></div>
                <div className="cell-seller">卖家：{order.seller}</div>
              </div>
              <div className="tbody">
                {order.items.map((item, i) =>
                  <div key={i} className="tr">
                    <div className="td cell-product">
                      <div className="td product-image">
                        <img src="" alt=""/>
                      </div>
                      <div className="td product-info">
                        {item._id}
                      </div>
                    </div>
                    <div className="td cell-price">{item.price}</div>
                    <div className="td cell-amount">{item.amount}</div>
                    <div className="td cell-refund">
                      <a href="#">退款</a>
                    </div>
                    {i === 0 ? (
                      [
                        <div key="0" className="td cell-realPay">{order.realPay}</div>,
                        <div key="1" className="td cell-status">{order.status || '订单状态'}</div>
                      ]
                    ) : (
                      Array(2).fill().map((v, i) =>
                        <div key={i} className={`td cell-empty-${i}`}>'Empty'</div>
                      )
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
