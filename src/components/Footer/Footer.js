import React from 'react'

import './Footer.css'

let menu = {
  items: Array(4).fill({
    title: 'Submenu Title',
    items: Array(4).fill(Object.assign({}, {
      content: 'Item xx'
    }))
  })
}
const Footer = (props) => {
  return (
    <footer className="main-footer">
      <div className="wrapper">
        <ul className="menu">
          {menu.items.map((submenu, idx) => (
            <li key={idx} className="submenu col-in-4">
              <div className="submenu-title">submenu.title</div>
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
