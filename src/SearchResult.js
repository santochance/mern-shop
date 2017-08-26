import React from 'react'
// import { Thumbnail } from 'react-bootstrap'
import './SearchResult.css'

// import SiteNav from './SiteNav.js'

const SearchResult = () => (
  <div>
    <div className="page">
      <div className="header">
        <span className="logo">
          <img src="" alt="IMG_logo"/>
        </span>
        <div className="search-bar">
          <input type="search" name="search" id=""/><button>搜索</button>
        </div>
      </div>
      <div className="content grid-total">
        <div className="grid-left">
          <div className="breadcrumb">所有分类 > ...</div>
          <div className="filters">
            <div>Filters 1</div>
            <div>Filters 2</div>
            <div>Filters 3</div>
            <div>...</div>
          </div>
          <div className="resultFilterBar">
            <ul style={{
              display: 'flex',
              flexWrap: 'wrap',
              listStyle: 'none'
            }}>
              <li>综合排序</li>
              <li>人气</li>
              <li>销量</li>
              <li>信用</li>
              <li>价格</li>
            </ul>
          </div>
          <div className="result">
            <div className="grid" style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}>
              {Array(12).fill().map((item, i) => (
                <div key={i} className="grid-item">
                  <div className="imgwrap">
                    <img src="" alt="IMG_prod_pic"/>
                  </div>
                  <div className="title">
                    Prod Title
                  </div>
                  <div>
                    <span>Price:200</span>
                    <button>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid-right">
          <div className="sidebar_v">
            <div className="brand">
              <div>掌柜</div>
              <div>掌柜</div>
              <div>掌柜</div>
            </div>
            <div className="ad Badge">
              <img src="" alt="广告"/>
              <img src="" alt="广告"/>
              <img src="" alt="广告"/>
            </div>
            <div>New Line</div>
            <ul className="item-list">
              {Array(4).fill().map((item, i) => (
                <div className="item">
                  <div className="imgwrap">
                    <img key={i} src="" alt="IMG_sidebar_pic"/>
                  </div>
                  <div>
                    <div className="badge">
                      <img src="" alt="badge"/>
                    </div>
                    <div className="price">
                      ￥40.22
                    </div>
                    <div className="sale">
                      销量：<span>74</span>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar_h hotselled">
          <div className="textlink-bar">
            <div className="banner">
              <a href="#">掌柜热卖</a>
            </div>
            <div className="textlink">
              <ul>
                {Array(6).fill().map((item, i) => (
                  <li>
                    <a href="#">Link{i}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="LINK_TARGET">
              <span className="ad">
                <img src="" alt="广告"/>
              </span>
              <a href="#">LINK_TARGET</a>
            </div>
          </div>
          <ul className="item-list">
            {Array(5).fill().map((item, i) => (
              <li className="item">
                <div className="imgwrap">
                  <a href="#" className="imgLink">
                    <img src="" alt="IMG_placeholder"/>
                  </a>
                </div>
                <div className="line1">
                  <div className="price">
                    <span>￥XX.XX</span>
                  </div>
                  <div className="postfree">Bagdge:包邮</div>
                </div>
                <div className="line2">
                  <div className="redtitle">Product Title with Red Keyword...</div>
                </div>
                <div className="line3">
                  <div className="shop">Shop Name</div>
                </div>
                <div className="line4">
                  <div className="sale">销量：</div>
                  <span className="js-sale-count"></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default SearchResult
