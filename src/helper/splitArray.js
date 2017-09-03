
function splitArray(arr, size) {
  let count = Math.ceil(arr.length / size)
  console.log('count:', count)
  let rst = []

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

// test()
