import React, { Component, Proptypes } from 'react'
import { Pagination } from 'antd'
import Sortbar from './Sortbar'
import ProductList from './ProductList'

class ProductShowcase extends Component {
  state = {
    pagination: {},
  }

  componentDidMount() {
    this.loadData()
      .then(dataSource => {
        this.setState({
          dataSource,
          pagination: {
            ...this.state.pagination,
            total: dataSource.length,
          }
        }, () => {
          let { sortKey, sortOrder } = this.state
          // 排序并分页数据
          this.onSortClick(sortKey, sortOrder)
        })
      })
      .catch(console.error)
  }

  loadData = () => {
    return fetch('/products')
      .then(res => res.json())
      .catch(console.error)
  }

  // 可以根据不同的sort指定用于Array.sort()的排序函数
  sorterFactory = (sortKey) => {
    if (sortKey === 'price') {
      return (a, b) => a.price - b.price
    }
  }

  // 传入SortLink的onClick回调函数
  onSortClick = (sortKey, sortOrder) => {
    let { dataSource, processedData, pagination } = this.state

    // 排序数据
    if (!sortKey || !sortOrder) {
      processedData = dataSource
    } else {
      let sorter = sortKey && this.sorterFactory(sortKey)
      processedData = dataSource.slice().sort(sorter)
      if (sortOrder === 'descend') {
        processedData.reverse()
      }
    }

    this.setState({
      processedData
    }, () => {
      // 重置pagination到defaultCurrent
      this.onPageChange(pagination.defaultCurrent, pagination.pageSize || pagination.defaultPageSize)
    })
  }

  // 传入Pagination组件的换页回调函数
  onPageChange = (page = 1, pageSize = 10) => {
    let { processedData } = this.state
    let currData = processedData.slice((page - 1) * pageSize, page * pageSize)
    this.setState({
      pagination: {
        ...this.state.pagination,
        current: page,
        pageSize,
      },
      currData,
    })
  }

  render() {
    let { currData, pagination } = this.state

    if (!currData) return null

    return (
      <div>
        <Sortbar onClick={this.onSortClick} />
        <ProductList products={currData} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <Pagination {...pagination} onChange={this.onPageChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductShowcase
