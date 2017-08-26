var mongoose = require('mongoose')
// Schema = mongoose.Schema;

// About [The `useMongoClient` Option](http://mongoosejs.com/docs/connections.html#use-mongo-client)
mongoose.connect('mongodb://localhost/meanshop', {
  useMongoClient: true
})

var db = mongoose.connection

// var ProductSchema = {  
  //   name: { type: String, required: true },
  //   description: String,

  //   price: { type: Number, min: 0, required: true },
  //   // original_price: { type: Number, min: 0 },
  //   // shipping: { type: Number, min: 0 },
  //   // stock: { type: Number, min: 0 },
  //   // sales: { type: Number, min: 0 },
  // /*  brand: String,
  //   serial_number: Number,
  //   published_at: Date,

  //   category: Array | Stirng,
  //   photo: Array | String,

  //   size: Array | String,
  //   color: Array | String,
  //   meterial: Array | String,

  //   created_at: Date,
  //   update_at: Date,
    

  //   details: Buffer,
  //   comments: Array*/
  // }

var Product = mongoose.model('Product', {
  name: { type: String, required: true },
  description: String,
  price: { type: Number, min: 0, required: true }
})

//
// 生成随机数据
//

/* 生成随机 Number */
const rdNum = function (start, end, isInt=true) {
  let s, e
  if (arguments.length === 1) {
    s = 0
    e = start
  } else {
    s = start
    e = end
  }
  let num = Math.random() * (e - s) + s
  return isInt ? Math.floor(num) : num
}

/* 生成随机 Timestamp*/
const rdTimestamp = function (start, end) {
  return rdNum(Date.parse(start), Date.parse(end))
}

/* 生成随机数据并存入 mongodb */
const rdDate = function (num) {
  Array(num).fill().forEach(d => {
    var ts = rdTimestamp('2017-06-01', new Date()) 
    var doc = new Product({
      name: `p-${ts}`,
      description: `Product created at ${new Date(ts)}`,
      price: Math.ceil(Math.random() * 1000)
    })
    doc.save()
    // console.log(doc)
  })
}

rdDate(20)