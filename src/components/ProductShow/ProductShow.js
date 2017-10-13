import React, { Component, PropTypes } from 'react'

// 分页功能模块
import  Page from '../../helper/page.js'

class ProductShow extends Component {
  state = {}

  componentDidMount() {
    this.loadData()
      .then(dataSource => this.setState({ dataSource }))
      .catch(console.error)
  }

  loadData() {}

  render() {
    let { addToCart } = this.props
    // 需要获取products, addToCart回调函数
    return (
      <div>ProductShow placeholder.</div>
    )
  }
}
