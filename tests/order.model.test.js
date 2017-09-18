const app = require('../server/server.js')
const should = require('should')
const request = require('supertest')(app)
const mongoose = require('mongoose')
const path = require('path')
const User = require('../server/models/user.server.model')
const Product = require('../server/models/product.model')
const Order = require('../server/models/order.model')
const random = require('../src/helper/randoms.js')
const _ = require('lodash')
const orderCtrlers = require('../server/controllers/order.controller.js')

let orders

describe('Order Controller Unit Tests:', () => {
  beforeEach((done) => {
    // 生成orders
    Promise.all([
      // 获取所有products和users
      Product.findAsync(),
      User.findAsync()
    ])
      .then(([products, users]) => {
        // console.log('rst:', rst)
        return [products, users.slice(0, 4)]
      })
      .then(([products, users]) => {
        // console.log('get products, users')
        should.exist(products)
        should.exist(users)

        // debugger

        // 断言：products, users
        users.should.be.Array()
        users.length.should.greaterThanOrEqual(3)
        products.should.be.Array()
        products.length.should.greaterThanOrEqual(0)

        // 从users中抽取一个作为buyer
        // let buyer = users.splice(_.random(users.length - 1), 1)[0]
        let buyer = users[_.random(users.length - 1)]._id.toString()

        buyer.should.be.String()
        // buyer.should.be.oneOf(users)

        // 函数: 随机抽取products生成items
        function makeItems () {
          return Array(_.random(4, 7)).fill({})
            .map(item =>
              Object.assign(item, {
                product: products[_.random(products.length - 1)]._id.toString(),
                amount: _.random(2, 5),
              }))
        }

        // 从users随机抽取2~4个作为sellers
        let sellers = _
          .chain(users)
          .shuffle()
          .slice(0, _.random(2, 4))
          .map(seller => seller._id.toString())
          .value()

          // 把sellers附上items, address等映射为orders
        orders = sellers.map(seller =>
          Object.assign({}, {
            buyer: buyer,
            seller: seller,
            items: makeItems(),
            address: '广东省 深圳市 龙华新区 民治街道 塘水围新村三区3幢',
            total: _.random(1000, 20000),
          })
        )

        // 断言：orders
        orders.should.be.Array()
        orders.length.should.greaterThanOrEqual(2)

        orders.forEach(order => {
          // order应该有buyer, seller, items, address
          // buyer,seller应该是users的元素
          order.should.has.properties([
            'buyer', 'seller', 'items', 'address'
          ])
          order['buyer'].should.be.String()
          order['seller'].should.be.String()

          // 每个item应该有content, amonut
          // content应该是products的元素
          // amount应该在2~5之间
          order['items'].forEach(item => {
            item.should.has.properties(['product', 'amount'])
            item['product'].should.String()
            item['amount'].should.be.within(2, 5)
          })

          // address应该...
          order['address'].should.equal('广东省 深圳市 龙华新区 民治街道 塘水围新村三区3幢')
          order['total'].should.within(1000, 20000)
        })
      })
      .then(done)
      .catch(console.error)
  })

  describe('Testing the create method', () => {
    it('Should create order with buyer and seller', (done) => {
      orders.should.be.Array().and.is.not.empty()

      request
        .post('/orders')
        .send(orders)
        .accept('json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)

          debugger

          // console.log('res.body:', res.body)

          done()
        })
    })
  })
})
