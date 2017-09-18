function genIndexDisplay({ headSize = 2, bodySize = 5, footSize = 1, min = 0, max, total }) {
  if (total > 0) {
    max = min + total - 1
  } else {
    // max 为假值或者max < min
    // 相当于 max >= min
    total = max >= min
      ? max - min + 1
      : 0
    // max保持undefined
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

  const updateDisplayer = (function(size, headSize, footSize) {
    return function(index) {
      let left, right, head, foot
      if (max - min < size) {
        left = min
        right = max
        head = 0
        foot = 0
      } else {
        if (size % 2) {
          left = index - (size - 1) / 2
          right = index + (size - 1) / 2
        } else {
          left = index - size / 2
          right = index + size / 2 - 1
        }

        // 修正left或right超出(min, max)的情况
        if (left < min) {
          left = min
          right = left + size - 1
        } else if (right > max) {
          right = max
          left = right - size + 1
        }
        // max - min >= (right - left == size)
        // 不存在left < min && right > max的情况

        // head的计算逻辑
        // left大于临界值时, head为常数, 此处为headSize
        // left小于等于临界值, head随着left减少, 变化量为1
        // 要点是通过增加修正量来确定这个临界值

        // head = (left > headSize)
        //   ? headSize
        //   : left

        // 更容易理解的逻辑是
        // 有headMax, footMax
        // head, foot最大值是headMax, footMax
        // left - min >= headMax, head = headMax
        // 否则, head = left - min
        head = left - min
        head = head >= headSize
          ? headSize
          : head
        foot = max - right
        foot = foot >= footSize
          ? footSize
          : foot
      }

      return [head, foot, left, right]
    }
  })(bodySize, headSize, footSize)

  const show = (function (min, max, size, headSize, footSize) {
    // 修正body部分的size
    size = Math.min(max - min + 1, size)

    return function(index = 1) {
      let keys = {}

      let rst = []

      // 如果total为假，返回空数组
      if (!total) return rst

      // Todo:
      // 如果total为1，返回数组
      // 或者不显示，返回null

      index = fixIndex(index)
      let [head, foot, left, right] = updateDisplayer(index)
      // console.log('head: %s, left: %s, right: %s', head, left, right)

      // Prev部分
      if (index <= min) {
        rst.push('')
      } else {
        rst.push('prev')
      }

      keys.prev = !(index <= min)

      // Head部分
      keys.head = Array(head).fill().map((v, i) => {
        v = min + i + 1
        rst.push(v)

        return v
      })

      // 前...部分
      if (left - min > headSize) {
        rst.push('...')
      }

      keys.preEllipsis = !!(left - min > headSize)

      // Body部分
      keys.body = Array(size).fill().map((v, i) => {
        v = left + i + 1
        v = v === index + 1 ? String(v) : v
        rst.push(v)

        return v
      })

      // 后...部分
      if (max - right > footSize) {
        rst.push('...')
      }

      keys.postEllipsis = !!(max - right > footSize)

      // Foot部分
      keys.foot = Array(foot).fill().map((v, i) => {
        v = max - foot + 1 + i + 1
        rst.push(v)

        return v
      })

      // Next部分
      if (index >= max) {
        rst.push('')
      } else {
        rst.push('next')
      }

      keys.next = !(index >= max)

      return {...keys, index, all: rst}
    }
  })(min, max, bodySize, headSize, footSize)

  return {
    show,
    min,
    max,
    total,
    bodySize,
    headSize,
    footSize,
  }
}

/* Test */
const test = () => {
  let total = 20
  let displayer = genIndexDisplay({ total, headSize: 2, bodySize: 5, footSize: 1 })

  // console.log(displayer)
  Array(total + 4).fill().forEach((v, i) => {
    let indexKeys = displayer.show(i)

    console.log('\n', i, indexKeys.all)
    console.log('keys object:', JSON.stringify(indexKeys))

  })
}
// test()

module.exports = genIndexDisplay
