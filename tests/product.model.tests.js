const app = require('../server/server.js')
const should = require('should')
const request = require('supertest')(app)
const mongoose = require('mongoose')
const path = require('path')
const Product = require('../server/models/product.model.js')

let fields
let uploadDir = path.resolve(__dirname, '../public/uploads/products')

describe('Product Controller Unit Tests:', () => {
  beforeEach((done) => {
    // 准备用于创建product的数据对象
    // formData
    fields = {
      productName: '2017款Apple/苹果 12 英寸 MacBook 256GB/512G',
      description: '苹果笔记本电脑',
      price: 8999,
      stock: 100,
      shipping: 50,
    }

    done()
  })

  describe('Testing the create method', () => {
    it('Should create product with images', (done) => {
      request
        .post('/products')
        .field(fields)
        .attach('images', 'tests\\uploads\\599846b6dc7fa139e04a7f44\\01.jpg')
        .attach('images', 'tests\\uploads\\599846b6dc7fa139e04a7f44\\02.jpg')
        .attach('images', 'tests\\uploads\\599846b6dc7fa139e04a7f44\\03.jpg')
        .attach('images', 'tests\\uploads\\599846b6dc7fa139e04a7f44\\04.jpg')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)

          res.body.should.be.an.Object()

          res.body.should.have.property('_id')
          res.body.should.have.properties(fields)

          res.body.should.have.property('album')

          console.log('album:', res.body.album)
          res.body['album'].should.be.Array()
            .and.has.length(4)
          done()
        })
    })
  })

})
