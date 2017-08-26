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
exports.rdProduct = function (num) {
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
