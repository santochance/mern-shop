import React, { PropTypes } from 'react'
import { Row, Col } from 'antd'
import ProductItem from './ProductItem'

const ProductList = ({ products }) => {

  return (
    <div className="product-list" style={{
      width: 990,
      margin: 'auto',
    }}>
      <Row gutter={16}>
        {products.map((product, idx) => (
          <Col key={idx} span={6}>
            <ProductItem item={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductList
