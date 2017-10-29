import React from 'react'
import './ProductDetails.css'

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        title: '商品名称',
        description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ratione aut, architecto sit nesciunt, optio ut molestias eaque deleniti molestiae...',
        imgPath: '/product_images/:size/:id/59e70cc7N85cd9b4d.jpg',
        price: 1999,
        oldPrice: 2599,
        stocks: 130,
        sales: 40,
        commentsNum: 130,
      },
      selected: {
        amount: 1,
      },
    }
  }
  componentDidMount() {
    let id = this.props.match.params['_id'] || '59f3b8913b3bf5f5c28dada2'
    if (id) {
      fetch(`/products/${id}`)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw res.json()
          }
        })
        .then(product => this.setState({ product }))
        .catch(console.error)
    }
  }
  render() {
    let { product } = this.state
    return (
      <div className="product-details-page wrapper">
        <div className="product-intro">
          <div className="left">
            图片预览
          </div>
          <div className="right">
            <div className="product-header">
              <div className="product-name">
                {product.title}
              </div>
              <div className="desc-wrapper flex-lr-ab">
                <span className="product-descrp">
                  {product.description}
                </span>
              </div>
            </div>
            <div className="product-price">
              <span className="now-price">
                <span className="symbol">￥</span>
                <span className="num">{product.price}</span>
              </span>
              <span className="old-price">
                <span className="symbol">￥</span>
                <span className="num">{product.oldPrice || 'xxxx'}</span>
              </span>
            </div>
            <div className="product-data">
              <span className="comment">
                <span className="text">累计评论</span>
                <span className="num">{product.commentsNum || '3x'}</span>
              </span>
              <span className="sales">
                <span className="text">成功交易</span>
                <span className="num">{product.sales || '2x'}</span>
              </span>
            </div>
            <div className="product-choice">
              <div className="choice-amount">
                数量：
                <input type="number" name="" id="" value="30" />
              </div>
            </div>
            <div className="product-op">
              <button className="btn btn-default">现在购买</button>
              <button className="btn btn-primary">加入购物车</button>
            </div>
          </div>
        </div>
        <div className="product-parti">
          <div>
            这里放一个tab组件...
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetails
