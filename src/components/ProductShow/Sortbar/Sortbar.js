import React, { Component, PropTypes } from 'react'
import './Sortbar.css'

export default class Sortbar extends Component {
  state = {
    min: '',
    max: '',
    msg: '',
    msgTimer: null,
  }

  handleChange = (e, key) => {
    // Todo: 问题是不能区分浮点数，即输入尾随小数点时不警告
    let value = e.target.value
    // 输入值不为空
    if (value) {
      value = Number(value)
      // 输入值不是纯数字
      if (isNaN(value)) {
        // 显示警告信息，不改变值
        return this.sendMsg('只能输入整数！')
      }
    }
    this.setState({[key]: value})
  }

  sendMsg(msg, wait = 1500) {
    let { msgTimer } = this.state
    this.setState({
      msg,
      msgTimer: setTimeout(() => {
        this.setState({ msg: ''})
      }, wait)
    })
  }

  handlePriceSubmit() {
    let { min, max } = this.state
    // min, max在这里只会是空字符串或正整数
    // 限制和修正min, max
    if (min === '' && max === '') {
      // 清除过滤器
      return this.props.onSubmit( { key: 'price' }, true)
    }
    let minV, maxV
    minV = min === '' ? 0 : min
    maxV = max === '' ? Infinity : max

    // 如果max < min, 交换min和max, 同时更新视图
    if (maxV < minV) {
      return this.setState({ min: max, max: min }, () => {
        this.props.onSubmit({ key: 'price', value: { min: maxV, max: minV }})
      })
    }
    return this.props.onSubmit({ key: 'price', value: { min: minV, max: maxV }})
  }

  handlePriceReset() {
    this.setState({ min: '', max: ''}, () => {
      this.props.onSubmit({ key: 'price' }, true)
    })
  }

  renderSortLink = (sortKey, sortOrder, text, titleText) => {

    let isActive = sortKey === this.props.sortKey &&
        sortOrder === this.props.sortOrder

    return (
      <li className={'sort-link ' + (isActive ? 'active' : '')}>
        <a href="#" title={titleText}
          onClick={e => {
          e.preventDefault()
          this.props.onClick(sortKey, sortOrder)
        }}>
          {text}
        </a>
      </li>
    )
  }
  render() {
    let { onPriceSubmit } = this.props
    let { msg } = this.state

    return (
      <div className="sort-filter-bar">
        <ul className="sort-wrapper">
          {this.renderSortLink('', false, '综合排序')}
          {this.renderSortLink('price', 'ascend', '价格从低到高', '价格较低的产品在前')}
          {this.renderSortLink('price', 'descend', '价格从高到低', '价格较高的产品在前')}
        </ul>
        <div className="price-filter">
          <div className="price-wrapper">
            {/*
            <span>价格范围：</span>
            */}
            <input className="price-min" type="text" placeholder="￥" title="按价格范围筛选 - 最低价"
              value={this.state.min} onChange={(e) => this.handleChange(e, 'min')} />
            <span className="price-sep">-</span>
            <input className="price-max" type="text" placeholder="￥" title="按价格范围筛选 - 最高价"
              value={this.state.max} onChange={(e) => this.handleChange(e, 'max')} />
            <button className="price-submit" onClick={() => this.handlePriceSubmit()}>确定</button>
            <button className="price-reset" onClick={() => this.handlePriceReset()}>清除</button>
            {msg && (<span className="price-warn">{msg}</span>)}
          </div>
        </div>
      </div>
    )
  }
}

Sortbar.propTypes = {
  onClick: PropTypes.func
}
