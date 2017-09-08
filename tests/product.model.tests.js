const app = require('../server/server.js')
const should = require('should')
const request = require('supertest')(app)
const mongoose = require('mongoose')
const path = require('path')
const Product = require('../server/models/product.model.js')
const random = require('../src/helper/randoms.js')

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

          // console.log('res.body:', res.body)

          /*
          res.body.should.have.property('album')
          res.body['album'].should.be.Array()
           */

          done()
        })
    })
  })


  describe('Testing the list method', () => {
    it('Should list all products', (done) => {
      request
        .get('/products')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)

          if (!res.body.length) {
            throw Error('no product created yet')
          }

          // console.log('res.body:', res.body)
          res.body.should.be.an.Array()
            .and.matchEvery(product => {
              product.should.has.properties(['_id', ...Object.keys(fields)])
            })

          done()
        })
    })
  })

  describe('Testing the read method', () => {
    it('Should read specific product', (done) => {
      let products
      request
        .get('/products')
        // .ok(res => res.status === 200)
        .then(res => {
          products = res.body
          return products[random(products.length) - 1]._id
        })
        .then((_id) => {
          request
            .get('/products/' + _id)
            .expect('Content-Type', /json/)
            .end((err, res) => {
              should.not.exist(err)

              res.body.should.be.an.Object()
                .and.has.property({ _id })
                .and.has.properties([...Object.keys(fields)])
            })
        })

      done()
    })
  })

})
