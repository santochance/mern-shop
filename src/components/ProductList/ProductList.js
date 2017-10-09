import React from 'react'
import { Row, Col, Pagination } from 'antd'

import './ProductList.css'

class ProductList extends React.Component {
  state = {
    page: {
      defaultCurrent: 1,
      defaultPageSize: 10,
    }
  }

  componentDidMount() {
    let { defaultCurrent = 1, defaultPageSize = 10 } = this.state.page
    this.loadData()
      .then(data => {
        this.setState({
          page: {
            defaultCurrent,
            defaultPageSize,
            total: data.length,
          },
          data,
          currData: data.slice((defaultCurrent - 1) * defaultPageSize, defaultCurrent * defaultPageSize),
        })
      })
  }

  loadData = () => {
    // 加载products
    return fetch('/products')
      .then(res => res.json())
      .catch(console.error)
  }

  getMockData = () => {
    // 使用模拟数据
    // 脱离后端api
  }

  onChange = (page, pageSize) => {
    let { data } = this.state
    let currData = data.slice((page - 1) * pageSize, page * pageSize)
    this.setState({
      page: {
        ...this.state.page,
        current: page,
        pageSize,
      },
      currData,
    })
  }

  handleMouseover = (idx) => {
    this.setState({ hoveringKey: idx })
  }

  render() {

    let { page, currData } = this.state

    if (!currData) return null

    return (
      <div className="product-list" style={{
        width: 990
      }}>
        <Row gutter={16}>
          {currData.map((d, idx) => (
            <Col key={idx} span={6} onMousover={() => this.handleMouseover(idx)}>
              <ProductItem key={idx} item={d} hovering={this.hoveringKey} />
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <Pagination {...page} onChange={this.onChange} />
          </div>
        </div>
      </div>
    )
  }
}

const ProductItem = (props) => {
  let { item, key, hovering } = props
  return (
    <div className="product-item">
      <div className="product-pic">
        <div className="pic-wrapper">
          <a href="">
            <img style={{ width: '100%', height: '100%' }} src={'/01.jpg'} alt=""/>
          </a>
        </div>
      </div>
      <div className="product-info">
        <div className="product-title">
          <a>{item.title || item.productName}</a>
        </div>
        <div className="product-desc">
          {item.description}
        </div>
        {key === hovering ? (
          <div className="product-price">
            <span>￥ {item.price}</span>
          </div>
        ) : (
          <div className="product-operation">
            <button className="btn btn-primary">加入购物车</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
