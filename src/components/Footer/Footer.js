import React from 'react'

import './Footer.css'

let menu = {
  items: [
    {
      title: '新手入门',
      items: [
        { content: '购物流程' },
        { content: '会员制度' },
        { content: '订单查询' },
        { content: '发票制度' },
      ]
    },
    {
      title: '配送服务',
      items: [
        { content: '上门自提' },
        { content: '配送服务查询' },
        { content: '配送费收取标准' },
        { content: '商品验货与签收' },
      ]
    },
    {
      title: '支付方式',
      items: [
        { content: '货到付款' },
        { content: '在线支付' },
        { content: '分期付款' },
        { content: '银行转账' },
      ]
    },
    {
      title: '售后服务',
      items: [
        { content: '售后政策' },
        { content: '返修/退换货' },
        { content: '退款说明' },
        { content: '联系客服' },
      ]
    },
  ]
}
const Footer = (props) => {
  return (
    <footer className="main-footer">
      <div className="wrapper">
        <ul className="menu">
          {menu.items.map((submenu, idx) => (
            <li key={idx} className="submenu col-in-4">
              <div className="submenu-title">{submenu.title}</div>
              <ul className="menu">
                {submenu.items.map((item, idx) => (
                  <li key={idx} className="menu-item">
                    <a className="link" href="">{item.content}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
