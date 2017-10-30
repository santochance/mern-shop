const _ = require('lodash')

function createManager({ total, size }) {
  if (!(total && size)) {
    throw Error('createManager expected 2 parameters')
  }
  var start, end, hasPrev, hasNext
  // 初始化
  start = 0
  end = start + (size - 1)
  checkStart()
  checkEnd()

  function update(direction, callback) {
    if (direction > 0) {
      // 设置end
      end += size
      checkEnd()
      // 根据end设置start
      start = end - (size - 1)
      checkStart()
    } else {
      // 设置start
      start -= size
      checkStart()
      // 根据start设置end
      end = start + (size - 1)
      checkEnd()
    }
    if (typeof callback === 'function') {
      callback({ start, end, hasPrev, hasNext, total, size})
    }
  }
  function checkStart() {
    if (start <= 0) {
      start = 0
      hasPrev = false
    } else {
      hasPrev = true
    }
  }
  function checkEnd() {
    if (end >= total - 1) {
      end = total - 1
      hasNext = false
    } else {
      hasNext = true
    }
  }

  return {
    update,
    prev: (cb) => { update(-1, cb) },
    next: (cb) => { update(1, cb) },
    total,
    size,
    start,
    end,
    hasPrev,
    hasNext,
  }
}

// 测试
// ---------

var test = function() {
  var mgr = createManager({ total: 20, size: 5})
  // 初始状态
  console.log('-- initial --')
  report(mgr)
  function report(obj) {
    console.log(
      'state:',
      _.range(obj.start, obj.end + 1),
      JSON.stringify(obj, ['start', 'end', 'hasPrev', 'hasNext', 'size', 'total'])
    )
  }

  var cnt
  // 连续执行5次next()
  console.log('-- 5 next() --')
  cnt = 5
  while (cnt--) {
    mgr.next(report)
  }


  // 连续执行5次prev()
  console.log('-- 5 prev() --')
  cnt = 5
  while (cnt--) {
    mgr.prev(report)
  }

  // 随机10次执行prev, next()
  console.log('-- 10 random prev() or next() --')
  cnt = 10
  while (cnt--) {
    var method = _.random() ? 'next' : 'prev'
    console.log(method)
    mgr[method](report)
  }
}

// test()

module.exports = createManager
