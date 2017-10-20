import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination, Row, Col } from 'antd'
import Sortbar from '../../components/ProductShowcase/Sortbar'
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
      filters: [],
    }
    this.onPageChange = this.onPageChange.bind(this)
    this.onSortClick = this.onSortClick.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }
  loadData(/* query */) {
    // query留于search功能时使用
    return fetch('/products')
      .then(res => res.json())
      .then(dataSource => this.process('load', { dataSource }))
      .catch(console.error)
  }

  process(changeType, updates) {
    if (changeType.search(/load|filter|sort|page/) < 0) return

    let newState = Object.assign({}, this.state, updates)

    console.log('filtes:', newState.filters)

    switch (changeType) {
      case 'load':
        newState.total = newState.dataSource.length
        newState.filters = [] // 重置过滤
        /* 注意这里贯穿 */
      case 'filter':
        newState.filteredData = this.filtering(newState.dataSource, newState.filters, this.filterFactory)
        newState.sortKey = '' // 重置排序
        /* 注意这里贯穿 */
      case 'sort':
        newState.sortedData = this.sorting(newState.filteredData, newState.sortKey, newState.sortOrder, this.sorterFactory(newState.sortKey))
        newState.current = 1 // 重置current为1
        /* 注意这里贯穿 */
      case 'page':
        newState.visibleData = this.paginating(newState.sortedData, newState.current, newState.pageSize)

        console.log()
        return this.setState({ ...newState })
      default: null
    }
  }

  // pure function
  filtering(data, filters, factory) {
    if (!filters || !filters.length) return data
    return filters.reduce((rst, f) => {
      var filterFn = factory(f.key)
      return (filterFn
        ? rst.filter(record => factory(f.key)(record, f.value))
        : rst)
    }, data)
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
  filterFactory(filterKey) {
    switch (filterKey) {
      case 'price':
        return (record, value) => record.price >= value.min && record.price <= value.max
      default: /* do nothing */
    }
  }
  sorterFactory(sortKey) {
    switch (sortKey) {
      case 'price':
        return (a, b) => a.price - b.price
      default: /* do nothing */
    }
  }

  onFilterChange(filter, isRemoving) {
    console.log('filter, isRemoving:', filter, isRemoving)
    // 检测参数
    function _checkArgs(f, isRev) {
      if (!(f && f.key)) return false
      if (!(isRev || 'value' in f)) return false
      return true
    }
    // 更新数组元素
    function _update(elem, array) {
      let index = array.findIndex(f => f.key === elem.key)
      return (index >= 0
        ? array.map((v, i) => i === index ? elem : v) /* 替换指定index的元素 */
        : array.concat(elem)) /* 添加元素 */
    }
    // 移除数组元素
    function _remove(elem, array) {
      return array.filter(f => f.key !== elem.key)
    }

    if (!_checkArgs(filter, isRemoving)) return
    let { filters } = this.state
    let newFilters = isRemoving ? _remove(filter, filters) : _update(filter, filters)

    this.setState({ filters: newFilters }, () => this.process('filter'))
  }
  onSortClick(sortKey, sortOrder) {
    this.process('sort', { sortKey, sortOrder })
  }
  onPageChange(current, pageSize) {
    this.process('page', { current, pageSize })
  }

  render() {
    let { addToCart } = this.props
    let { visibleData, current, pageSize, total, sortKey, sortOrder } = this.state
    // 需要获取products, addToCart回调函数
    return (
      <div>
        <Sortbar onClick={this.onSortClick} onSubmit={this.onFilterChange}
          {...{sortKey, sortOrder}} />
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

ProductShow.propTypes = {
  addToCart: PropTypes.func
}
const ProductList = ({ visibleData, addToCart }) => {
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
        <div className="product-price">
          <span>￥ {item.price}</span>
        </div>
        <div className="product-operation">
          <button className="btn btn-primary"
            onClick={() => addToCart(item, 1)}>放入购物车</button>
        </div>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  item: PropTypes.object,
  addToCart: PropTypes.func,
}

export default ProductShow
