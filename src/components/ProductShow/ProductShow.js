import React, { Component, PropTypes } from 'react'
import { Pagination, Row, Col } from 'antd'
// 分页功能模块
// import  Page from '../../helper/page.js'

import '../ProductList/ProductList.css'

class ProductShow extends Component {
  constructor(props) {
    super(props)
    // 使用props传入的数据源初始化
    let { defaultPageSize = 10, defaultCurrent = 1, current, pageSize } = props
    // let page = new Page(dataSource, defaultPageSize)
    this.state = {
      current: current || defaultCurrent,
      pageSize: pageSize || defaultPageSize,
      sortKey: '',
      sortOrder: false,
    }
    this.onPageChange = this.onPageChange.bind(this)
    this.onSortClick = this.onSortClick.bind(this)
  }

  componentDidMount() {
    this.loadData()
      .then(dataSource => {
        this.setState({
          dataSource,
          total: dataSource.length,
        }, () => {
          console.log('dataSource set')
          let { sortKey, sortOrder, current, pageSize } = this.state
          this.process('filter', {
            current,
            pageSize,
            sortKey,
            sortOrder,
          })
        })
      })
      .catch(console.error)
  }
  loadData() {
    return fetch('/products')
      .then(res => res.json())
      .catch(console.error)
  }

  process(changeType, { sortKey, sortOrder, current, pageSize, filters }) {
    // 由dataSource经过过滤，排序，分页得到最终的visibleData
    // 如果触发'filter',
    if (changeType.search(/filter|sort|page/) < 0) return

    let { dataSource } = this.state
    if (!(dataSource && dataSource.length)) throw Error('没有可用的dataSource!')

    let {
      filteredData = dataSource,
      sortedData = dataSource,
    } = this.state
    let visibleData
    let updates = {}

    switch (changeType) {
      case 'filter':
        filteredData = this.filtering(dataSource, filters)
        Object.assign(updates, {
          filters, filteredData
        })

      /* 注意这里往下贯穿！！ */
      case 'sort':
        sortedData = this.sorting(filteredData, sortKey, sortOrder, this.sorterFactory(sortKey))
        Object.assign(updates, {
          sortKey, sortOrder, sortedData
        })
      /* 注意这里往下贯穿！！ */
      default:
        visibleData = this.paginating(sortedData, current, pageSize)
        Object.assign(updates, {
          current, pageSize, visibleData
        })
    }

    this.setState({
      ...updates
    })
  }

  // pure function
  filtering(data, filters) {
    if (!filters || !filters.length) return data
  }
  // pure function
  sorting(data, sortKey, sortOrder, sorter) {
    // sortKey和sortOrder任一为假值, 直接返回未排序数据
    if (!sortKey || !sortOrder) return data
    let sortedData = data.slice().sort(sorter)
    if (sortOrder === 'descend') {
      sortedData.reverse()
    }
    return sortedData
  }
  // pure function
  paginating(data, page, pageSize) {
    return data.slice((page - 1) * pageSize, page * pageSize)
  }
  sorterFactory(sortKey) {
    switch (sortKey) {
      case 'price':
        return (a, b) => a.price - b.price
      default: /* do nothing */
    }
  }

  onSortClick(sortKey, sortOrder) {
    this.process('sort', { sortKey, sortOrder })
  }
  onPageChange(current, pageSize) {
    this.process('page', { current, pageSize })
  }

  render() {
    let { addToCart } = this.props
    let { visibleData, current, pageSize, total } = this.state
    // 需要获取products, addToCart回调函数
    return (
      <div>
        <ProductList visibleData={visibleData} addToCart={addToCart} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <Pagination {...{current, pageSize, total}} onChange={this.onPageChange}
              onShowSizeChange={this.onPageChange} />
          </div>
        </div>
      </div>
    )
  }
}

class ProductList = ({ visibleData, addToCart }) => {
  if (!visibleData) return null

  return (
    <div className="product-list" style={{
      width: 990,
      margin: 'auto',
    }}>
      <Row gutter={16}>
        {visibleData.map((d, idx) => (
          <Col key={idx} span={6}>
            <ProductItem key={idx} item={d} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

ProductList.propTypes = {
  visibleData: PropTypes.arrayOf(PropTypes.object),
  addToCart: PropTypes.func,
}

const ProductItem = ({ item, addToCart }) => {
  return (
    <div className="product-item">
      <div className="product-pic">
        <a href="" className="pic-wrapper">
          <img style={{ width: '100%', height: '100%' }} src={'/01.jpg'} alt=""/>
        </a>
      </div>
      <div className="product-info">
        <a href="" className="product-title">
          {item.title || item.productName}
        </a>
        <div className="product-desc">
          {item.description}
        </div>
        {/*
        {key === hovering ? (
          <div className="product-price">
            <span>￥ {item.price}</span>
          </div>
        ) : (
          <div className="product-operation">
            <button className="btn btn-primary"
              onClick={() => addToCart(item, 1)}>加入购物车</button>
          </div>
        )}
        */}
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  item: PropTypes.object,
  addToCart: PropTypes.func,
}

export default ProductShow
