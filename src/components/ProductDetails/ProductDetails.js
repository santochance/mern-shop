import React from 'react'
import PropTypes from 'prop-types'
import './ProductDetails.css'

import createManager from '../../helper/createManager'

const replacePath = function (path, params) {
  let rst = path.match(/:([^/]+)/g)
  if (!rst) return path
  return rst.reduce((p, token) => {
    let key = token.slice(1)
    return key in params ? p.replace(token, params[key]) : p
  }, path + '')
}

let mockSmUrls = [
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70cc7N85cd9b4d.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70ccbN5f8ed177.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70ccbN1968739b.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70cccNb4839a6e.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70ccaN22997367.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70cbdN10574a08.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70cffN1895dfb7.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70cfeN2c6e1503.jpg',
  '/product_images/59f3b8913b3bf5f5c28dada2/list/59e70d07N107d1a33.jpg',
]
let mockMdUrls = mockSmUrls.map(url => url.replace('list', 'preview'))

class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        title: '商品名称',
        description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ratione aut, architecto sit nesciunt, optio ut molestias eaque deleniti molestiae...',
        price: 1999,
        oldPrice: 2599,
        stocks: 130,
        sales: 40,
        commentsNum: 130,
        detailContent: [
          '/product_images/59f3b8913b3bf5f5c28dada2/particulars/592e35e7N0dc9ccad.jpg',
          '/product_images/59f3b8913b3bf5f5c28dada2/particulars/592e35e8N5ebbc61e.jpg',
          '/product_images/59f3b8913b3bf5f5c28dada2/particulars/592e35e8Ne1cd19dd.jpg',
          '/product_images/59f3b8913b3bf5f5c28dada2/particulars/592e35e8Nee54df79.jpg',
          '/product_images/59f3b8913b3bf5f5c28dada2/particulars/5993ae15N35429a29.jpg',
        ], // 商品详情描述图片数组
      },
      selected: {
        amount: 1,
      },
      loaded: false,
    }
  }
  componentDidMount() {
    let id = this.props.match.params['id']
    console.log('product details for:', id)
    if (id) {
      fetch(`/products/${id}`, {
        credentials: 'include'
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw res.json()
          }
        })
        .then(product => {
          var smUrls, mdUrls

          // 如果imgUrls为非空数组
          if (product.imgUrls && product.imgUrls.length) {
            smUrls = (product.imgUrls).map(base =>
              replacePath(product.imgPath, { id: product._id, size: 'list', base }))
            mdUrls = smUrls.map(url => url.replace('list', 'preview'))
          }
          this.setState({
            product: Object.assign({}, this.state.product, product),
            smUrls,
            mdUrls,
            loaded: true,
          })
        })
        .catch(console.error)
    }
  }

  render() {
    let { app } = this.props
    let { product, selected: { amount } } = this.state

    if (!this.state.loaded) return null

    return (
      <div className="product-details-page wrapper">
        <div className="product-intro">
          <div className="product-preview left">
            <Gallery smUrls={this.state.smUrls} mdUrls={this.state.mdUrls} />
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
              <span className="old-price" style={{ marginLeft: 5 }}>
                <span className="symbol">￥</span>
                <span className="num">{product.oldPrice}</span>
              </span>
            </div>
            <div className="product-data">
              <span className="comment">
                <span className="text">累计评论</span>
                <span className="num">{product.commentsNum}</span>
              </span>
              <span className="sales">
                <span className="text">成功交易</span>
                <span className="num">{product.sales}</span>
              </span>
            </div>
            <div className="product-choice">
              <div className="choice-amount">
                数量：
                <input type="number" name="" id="" value={amount} onChange={(e) => this.setState({selected: {...this.state.selected, amount: e.target.value}})} />
              </div>
            </div>
            <div className="product-op">
              <button className="btn btn-default">现在购买</button>
              <button className="btn btn-primary" onClick={() => {
                app.addToCart(product, this.state.selected.amount)
                this.setState({selected: {...this.state.selected, amount: 1}})
              }}>加入购物车</button>
            </div>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <div className="detail-header">
              <h3 style={{
                fontSize: 20,
                padding: '20px 10px',
                margin: '20px 0',
                backgroundColor: '#eee',
              }}>商品详情</h3>
            </div>
            <div className="detail-content-wrap">
              <DetailContent content={product.detailContent} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const DetailContent = ({ content }) => {
  return (
    <div className="detail-content">
      {content.map((pic, idx) => (
        <div key={idx} className="item">
          <img src={pic} alt="" style={{ width: '100%' }} />
        </div>
      ))}
    </div>
  )
}
DetailContent.propTypes = {
  content: PropTypes.array
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
      listTransX: 0,
      step: 76, /* 每个item的width + gutter, 此处是58, 18 */
      debug: false,
    }

  }
  componentDidMount() {
    // console.log('gallery did mount')
    this.mgr = createManager({
      total: this.props.smUrls.length, /* 图片list的items数量 */
      size: 5
    })
  }

  componentWillReceiveProps(nextProps) {
    // 由于添加ProductDetails.state.loaded改变了Gallery的渲染时机
    // Gallery在DidMount时就参接收到smUrls
    // 并且最初不会触发WillReceiveProps
    // console.log('gallery will receive props')
    if (!this.mgr && nextProps.smUrls) {
      // 添加Gallery的list index管理器
      this.mgr = createManager({
        total: nextProps.smUrls.length, /* 图片list的items数量 */
        size: 5
      })
    }
  }

  changeListIndex(mode) {
    // start是当前list显示区的最左边item的index
    this.mgr[mode](({ start }) => this.setState({
      listTransX: start * -this.state.step
    }))
  }

  render() {
    let { smUrls, mdUrls } = this.props
    let { activeKey, listTransX } = this.state

    if (!(smUrls && smUrls.length)) {
      return (<p>此商品还没有添加图片！</p>)
    }
    return (
      <div className="gallery">
        <div className="gallery-wrap">
          <div className="pic-preview">
            <img src={mdUrls[activeKey]} alt=""/>
          </div>
          <div className="pic-list">
            <a href="javascript:0;" className="pic-prev" onClick={() => this.changeListIndex('prev')}></a>
            <a href="javascript:0;" className="pic-next" onClick={() => this.changeListIndex('next')}></a>
            <div className="pic-items">
              <ul className="items-wrap" style={{ transform: `translateX(${listTransX}px)` }}>
                {smUrls.map((url, idx) => (
                  <li key={idx} className={'pic-item' + (activeKey === idx ? ' active' : '')} onMouseEnter={() => { this.setState({ activeKey: idx }) }}>
                    <img src={url} alt=""/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {this.state.debug && (
            <div>
              <div >ActiveKey: {activeKey}</div>
              <div>listTransX: {listTransX}
                <p><input type="range" value={-listTransX / 5} onChange={(e) => this.setState({listTransX: -e.target.value * 5})}/></p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
Gallery.propTypes = {
  smUrls: PropTypes.array,
  mdUrls: PropTypes.array,
}

export default ProductDetails
