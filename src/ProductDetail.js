import React from 'react'

import { withRouter } from 'react-router'

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    }
  }

  // loadData
  componentDidMount() {
    fetch(this.props.match.url)
      .then(res => res.json())
      .then(product => this.setState({ product }))
      .catch(console.error)
  }

  render() {
    const { product } = this.state

    if (!product) return null

    return (
      <div className="product-view">
        <div className="breadcrume">
          placeholder for Breadcrume
        </div>
        <div className="product-intro">
          Product:
          <pre>{JSON.stringify(this.state.product, null, 2)}</pre>
          <div>
            <button className="btn btn-danger"
              onClick={
                () => this.props.onAddToCart({ product, amount: 1 })
              }>Add to Cart</button>
          </div>

          <div className="album preview">
            <img src="" alt="Album placeholder" width="400" height="400" />
          </div>
          <div className="itemInfo">
            <div className="title">Product Title</div>
            <div className="desc">Product Desc</div>
            <div className="price">Product Price</div>
            <div className="shipping">Product Shipping</div>
          </div>
          <div className="choose">
            <div className="choose-attrs">商品规格选择</div>
          </div>
        </div>
        <div className="product-detail">
          placeholder for Product detail
        </div>
      </div>
    )
  }
}

export default ProductDetail
