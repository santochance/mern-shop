import React from 'react'

import PageTop from './PageTop.js'

import { Link, withRouter } from 'react-router-dom'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
    this.search = this.search.bind(this)
  }

  // loadData
  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ result: products }))
      .catch(console.error)
  }

  search() {
    const term = encodeURIComponent(document.getElementsByName('search')[0].value)

    fetch(`/products/${term}/search`).then(res => {
      if (res.ok) {
        res.json().then(result => {
          this.setState({
            result: [].concat(result)
          })
        })
      } else {
        res.json().then(console.error)
      }
    }).catch(console.error)
  }

  render() {
    return (
      <div>
        <PageTop onSearch={this.search} />
        <ProductGrid result={this.state.result} onAddToCart={this.props.onAddToCart} />
      </div>
    )
  }
}

const ProductGrid = withRouter((props) => {

  function showDetail(props, id) {
    console.log('load data to show product')
    fetch(`/products/${id}`)
      .then(res => { debugger; return res.json() })
      .then(product => {
        props.history.push({
          pathname: `/products/${id}`,
          state: { product: product }
        })
      })
  }

  return (
    <div className="product-grid grid">
      {props.result.map((product, i) => (
        <div className="grid-item" key={i}>
          <div>ID: {product._id}
            <Link to={`/products/${product._id}`} className="btn btn-info">Show Detail</Link>
          </div>
          <div className="imgwrap">
            {/*
            <img src={require(product.imageUrl)} alt="IMG_prod_pic"/>
            */}
            <div>Image: {product.imageUrl}</div>
          </div>
          <div className="title">{product.title}</div>
          <div>
            <span>{product.price}</span>
            <button className="btn btn-danger" onClick={() => props.onAddToCart(product, 1)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  )
})

export default Search
