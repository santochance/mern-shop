import React, { Component, PropTypes } from 'react'
import './Sortbar.css'

export default class Sortbar extends Component {
  state = {}

  renderSortLink = (sortKey, sortOrder, text) => {

    return (
      <a href="#" onClick={e => {
        e.preventDefault()
        this.props.onClick(sortKey, sortOrder)
      }}>
        {text}
      </a>
    )
  }

  render() {
    return (
      <div className="sort-filter-bar">
        <ul className="sort-wrapper">
          <li className="sort-link">
            {this.renderSortLink('price', 'ascend', '价格从低到高')}
          </li>
          <li className="sort-link">
            {this.renderSortLink('price', 'descend', '价格从高到低')}
          </li>
        </ul>
      </div>
    )
  }
}

Sortbar.propTypes = {
  onClick: PropTypes.func
}
