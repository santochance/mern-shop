// function recur(max, n = 1) {
//   console.log('max, n:', max, n)
//   if (n >= max) return 1
//   return Array(n).fill(recur(max, n + 1))
// }

// console.log(recur(1))
// console.log(recur(2))
// console.log(recur(3))
// console.log(recur(4))

// var spy = {level: 0}
// function recur2(n, rst = [1,2,3,4], spy) {
//   spy.level++
//   if (n <= 1) return rst
//   let arr = []
//   arr.push(recur2(--n, rst, spy))
//   return arr
// }

// console.log(recur2(1, [32, 32], spy = {level: 0}), spy)
// console.log(recur2(2, [16, 16, 16], spy = {level: 0}), spy)
// // console.log(recur3(3))


// function recur(level = 0) {
//   return function (n) {
//     level++
//     if (n <= 1) return 1

//     let arr = []
//     arr.push(recur(level)(--n))
//     console.log('level %s with arr %s:', level, arr)
//     return arr
//   }
// }

// console.log(recur()(4))


let trunk = {
  children: [
    {
      children: [
        {
          content: 'something',
          count: 1,
        },
        {
          content: 'something',
          count: 1,
        },
        {
          content: 'something',
          count: 1,
        },
      ],
      count: 0,
    },
    {
      children: [
        {
          content: 'something',
          count: 1,
        },
        {
          content: 'something',
          count: 1,
        },
      ],
      count: 0,
    },
  ],
  count: 0
}

function countItem(level = 0) {
  return function(entry) {
    if (!entry.children) return 1

    // 设置spy
    let spy = []
    let rst = entry.children.reduce((count, e) => {
      let sum = countItem(level + 1)(e)

      // 填充spy
      spy.push(sum)
      console.log('sum:', sum)
      return (count += sum)
    }, 0)
    console.log('level %s with %s', level + 1, JSON.stringify(spy))
    // 打印spy
    console.log('level %s with rst %s', level, JSON.stringify(rst))
    return rst
  }
}

countItem(0)(trunk)
