const replacer = (function () {
  function ObjectId(id) {
    this._id = id.toString()
    this._class = 'ObjectId'
  }

  return function (k, v) {
    if (typeof v === 'object' && v.constructor.name === 'ObjectId') {
      return new ObjectId(v)
    }

    return v
  }
})()

const reviver = (function () {
  function ObjectId(id) {
    this._id = id.toString()
  }

  return funciton (k, v) {
    if (typeof v === 'object' && v._class === 'ObjectId') {
      return new ObjectId(v)
    }

    return v
  }
})()


var obj = {
  buyer: ObjectId {},
  seller: ObjectId {},
  items: [
    ObjectId {}
  ],
  price: 1000,
  paymentType: 'alipay',
}

var text = JSON.stringify(obj, replacer, 2)
// text.buyer  "{_id: 123412345315, _class: 'ObjectId'}"
// _id是数字，且满足位数
// 有_class, 且值为'ObjectId'
var parsedObj = JSON.parse(text)

parsedObj {
  buyer: {_id, _class},
  seller: {},
  items:
}

function assertObjectId(obj, src) {
  obj.should.has.keys('_id', '_class')
  obj['_id'].should.equal(src.toString())
  obj['_class'].should.equal(src.constructor.name)
}

parsedObj.should.has.properties(Object.keys(obj))
parsedObj['buyer'].should.match(assertObjectId)
parsedObj['seller'].should.match(assertObjectId)
parsedObj['items'].should.matchEvery(assertObjectId)


//
// 浅层对象测试

var obj = new mongoose.Types.ObjectId()

var text = JSON.stringify(obj, replacer)
var parsedObj = JSON.parse(text)
parsedObj.should.has.keys('_id', '_class')
parsedObj['_id'].should.equal(src.toString())
parsedObj['_class'].should.equal(src.constructr.name)

// 深层对象测试
var obj = {
  buyer: new mongoose.Types.ObjectId(),
  seller: new mongoose.Types.ObjectId(),
  items: []
}
var text = JSON.stringify(obj, replacer)
var parsedObj = JSON.parse(text)

// 遍历对象
function traversalObj(obj) {
  Object.entries(obj).map(([key, value]) => {
    if (value is Object or Array) {
      traversalObj(value)
    } else {
      assert(dest, src)
    }

    // 如果遇到ObjectId对象，执行断言
    // 否则递归遍历
  })
}

// 这个不就是类似mongoDB数据库的数据过滤查询吗？


var data = JSON.parse(text, reviver)



