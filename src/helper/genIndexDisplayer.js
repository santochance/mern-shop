function genIndexDisplay({ headSize = 2, bodySize = 5, min = 0, max }) {
  if (!max || max < min) {
    throw Error('error `max` setted')
  }

  const fixIndex = (function(min, max) {
    return function(index) {
      return index >= min
        ? index <= max
          ? index
          : max
        : min
    }
  })(min, max)

  const updateDisplayer = (function(size, headSize) {
    return function(index) {
      let left, right, head
      if (max - min < size) {
        left = min
        right = max
        head = 0
      } else {
        if (size % 2) {
          left = index - (size - 1) / 2
          right = index + (size - 1) / 2
        } else {
          left = index - size / 2
          right = index + size / 2 - 1
        }

        if (left < min) {
          left = min
          right = left + size - 1
        } else if (right > max) {
          right = max
          left = right - size + 1
        }
        // max - min >= (right - left == size)
        // 不存在left < min && right > max的情况
        head = (left > headSize)
          ? headSize
          : left - headSize + 1
        head = head >= 0 ? head : 0
      }

      return [head, left, right]
    }
  })(bodySize, headSize)

  const show = (function (min, max, size, headSize) {
    // 修正body部分的size
    size = Math.min(max - min + 1, size)

    return function(index = 1) {
      let rst = []

      index = fixIndex(index)
      let [head, left, right] = updateDisplayer(index)
      // console.log('head: %s, left: %s, right: %s', head, left, right)

      // Prev部分
      if (index <= min) {
        rst.push('')
      } else {
        rst.push('prev')
      }
      // Head部分
      Array(head).fill().forEach((v, i) =>
        rst.push(i + 1)
      )

      // 前...部分
      if (left > headSize + 1) {
        rst.push('...')
      }

      // Body部分
      Array(size).fill().forEach((label, i) => {
        label = left + i + 1
        label = label === index + 1 ? String(label) : label
        rst.push(label)
      })

      // 后...部分
      if (right < max) {
        rst.push('...')
      }

      // Next部分
      if (index >= max) {
        rst.push('')
      } else {
        rst.push('next')
      }

      return rst
    }
  })(min, max, bodySize, headSize)

  return {
    show,
    min,
    max,
    bodySize,
    headSize,
  }
}

/* Test */
const test = () => {
  let max = 3
  let displayer = genIndexDisplay({ max, headSize: 3, bodySize: 6 })

  console.log(displayer)
  Array(max + 4).fill().forEach((v, i) => console.log('\n', i, displayer.show(i)))
}
// test()

module.exports = genIndexDisplay
