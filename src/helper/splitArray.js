function splitArray(arr, size) {
  if (typeof size !== 'number') {
    throw new Error('size must be a number!')
  }
  if (!Array.isArray(arr)) {
    throw new Error('arr must be an array!')
  }
  // 提问：如果arr是空数组，返回什么？
  // 返回空数组
  if (size < 0 || !arr.length) {
    return arr
  }
  let rst = []
  let count = Math.ceil(arr.length / size)
  // console.log('count:', count)

  while (count--) {
    rst.unshift(arr.slice(count * size, (count + 1) * size))
  }

  return rst
}

/* Testing */

function test() {
  // 数字序列数组
  var seed = Array(60).fill().map((v, i) => i)

  console.log('size: 3', splitArray(seed, 3))
  console.log('size: 5', splitArray(seed, 5))
  console.log('size: 8', splitArray(seed, 8))
  console.log('size: 10', splitArray(seed, 10))
}

// Object.assign(module.exports, {
//   splitArray
// })

module.exports = splitArray

// test()
