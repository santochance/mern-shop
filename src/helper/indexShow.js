function genIndexDisplay({ headSize = 2, bodySize = 5, total, min = 1, max}) {

  const fixIndex = function(min, max) {
    return function(index) {
      return index >= min
        ? index <= max
          ? index
          : max
        : min
    }
  }(min, max)

  const updateDisplayer = function(size, headSize) {
    return function(index) {
      let left, right
      if (size % 2) {
        left = index - (size - 1) / 2
        right = index + (size - 1) / 2
      } else {
        left = index - size / 2
        right = index + (size - 1) / 2
      }
      left = fixIndex(left)
      right = fixIndex(right)

      head = (left > headSize)
        ? headSize
        : left - headsize + 1
      head = head >= 0 ? head : 0

      return [head, left, right]
    }
  }(bodySize, headSize)

  const go = function (min, max, size, headSize) {
    return function(index) {
      let rst = []
      let [head, left, right] = updateDisplayer(index)
      // Prev部分
      if (index <= min) {
        rst.push('dis-prev')
      } else {
        rst.push('prev')
      }
      // Head部分
      if (left > headSize) {
        Array(head).fill().forEach((v,i) =>
          rst.push(i + 1)
        )
      }

      // 前...部分
      if (left > headSize + 1) {
        rst.push('...')
      }

      // Body部分
      Array(size).fill().forEach((v, i) => {
        v = left + i
        v === index ? v + '#' : v
        rst.push(v)
      })

      // 后...部分
      if (right < max) {
        rst.push('...')
      }

      // Next部分
      if (index >= max) {
        rst.push('dis-next')
      } else {
        rst.push('next')
      }

      return rst
    }
  }(min, max, bodySize, headSize)

  return {
    go(index) {

      return
    },
  }
}

let headSize = 2
let bodySize = 5
let start = 1
let end = 20
let index = 1
let left, right

if (bodySize % 2) {
  left = index - (bodySize - 1) / 2
  right = index + (bodySize - 1) / 2
} else {
  left = index - bodySize / 2
  right = index + (bodySize - 1) / 2
}

// 修正index, left, right
function indexFixer(min, max) {
  return function(index) {
    index >= min
      ? index <= max
        ? index
        : max
      : min
  }
}

function updateBody(index) {

  return [left, right]
}

function updateHead(left) {

}

function genOutput() {

}

const fixedIndex = indexFixer(start, end)

function gotoIndex(index) {
  // 修正index
  index = fixedIndex(index)
  // 更新left, right
  let [left, right] = updateBody(index)
  // 修正left, right

  // 更新head
  let head = updateHead(left)
  // 修正head

  // 生成输出数据
  let rst = genOutput(index, left, right, head)


  // index显示序列
  return
}

