import React from 'react'
import { Link } from 'react-router-dom'
import { Affix } from 'antd'

import './CartDetails.css'

const CartDetails = ({ app, cart }) => {

  /* 测试获取勾选项 */
  let checkedItems = app.getCheckedItems(cart)
  console.log('checked items:', checkedItems)

  return (
    <div className="cart">
      <div className="cart-main">
        <div className="cart-desc">
          <div className="th desc-check">
            <label>
              <input type="checkbox" name="" id=""
                checked={cart.checked}
                onChange={() => app.check(cart)}
              />全选
            </label>
          </div>
          <div className="th desc-info">商品信息</div>
          {/*
          <div className="th desc-param">&nbsp;</div>
          */}
          <div className="th desc-price">单价
          </div>
          <div className="th desc-quantity">数量</div>
          <div className="th desc-sum">金额</div>
          <div className="th desc-opera">操作</div>
        </div>
        <div className="order-list">
          {cart.children.map((order, i) => (
            <div key={i} className="order-content">
              {/*
                <div className="order-shopInfo">
                  <div className="checkOrder">
                    <input type="checkbox" name="" id=""
                      checked={order.checked}
                      onChange={() => app.check(order)}/>
                  </div>
                  <span className="badge shopIcon">badge</span>
                  <span>Shop Name</span>
                  <span>Count: {order.count}</span>{'  '}
                  <span>Price: {order.price}</span>
                </div>
              */}
              <div className="order-items">
                {order.children.map((item, i) => (
                  <div key={i} className="item-content">
                    <div className="col cell-check">
                      <input className="check" type="checkbox" name="" id=""
                        checked={item.checked}
                        onChange={() => app.check(item)}/>
                    </div>
                    <div className="col cell-info">
                      <div className="info-image">
                        <img src={item.content.imageUrl} alt=""/>
                      </div>
                      <div className="info-title">
                        <a>{item.content.title || '商品标题...'}</a>
                      </div>
                    </div>
                    {/*
                    <div className="col cell-param"></div>
                    */}
                    <div className="col cell-price">
                      <div className="price-now">￥{item.content.price}</div>
                    </div>
                    <div className="col cell-quantity">
                      <input type="number" name="" id="" min="1"
                        value={item.amount} style={{width: '80px'}}
                        onChange={(e) => app.updateItem(item, e.target.value || 1)} />
                    </div>
                    <div className="col cell-sum">
                      <div className="item-sum">￥{item.price}</div>
                    </div>
                    <div className="col cell-opera">
                      <div>
                        <a href="#" onClick={() => app.removeItem(item)}>删除</a>
                      </div>
                      <div>
                        <a href="#">移入收藏夹</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Affix offsetBottom={0}>
          <div className="order-footer">
            <div className="footer-check">
              <label>
                <input type="checkbox" name="" id=""
                  checked={cart.checked}
                  onChange={() => app.check(cart)}
                />全选
              </label>
            </div>
            <div className="footer-opera">
              <a className="footer-favSelected">
                移入收藏夹
              </a>
              <a className="footer-delSelected"
                onClick={(e) => {
                  e.preventDefault()
                  app.batchRemoveItems(checkedItems)
                }}>
                删除
              </a>
            </div>
            <div className="footer-right">
              <div className="amount-sum">
                <span className="text">已选商品</span>
                <span className="selectedItemCount">{cart.count || 0}</span>
                <span className="text">件</span>
              </div>
              <div className="price-sum">
                <span className="text">合计（不含运费）：</span>
                <span className="price">
                  <span className="totalSymbol">￥</span>
                  <span className="total">{cart.price || 0}</span>
                </span>
              </div>
              <Link to="/confirm-order" className="checkout" disabled={checkedItems.length < 1}>
                结&nbsp;算
              </Link>
              {/* 添加disable attr是可以禁止跳转的，但需要自定义样式 */}
              {checkedItems.length < 1 && (
                <div>禁用按钮中！</div>
              )}
            </div>
          </div>
        </Affix>
      </div>
    </div>
  )
}

export default CartDetails

// cart的数据结构是怎样的？
