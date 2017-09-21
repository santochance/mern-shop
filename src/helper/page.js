const splitArray = require('./splitArray.js')
const genIndexDisplay = require('./genIndexDisplayer.js')
const _ = require('lodash')
const should = require('should')

class Page {
  constructor(data, size, index) {
    this.init({ data, size, index })
  }

  init({ data, size, index = 0, sort }) {
    data = data || this._rawdata
    size = size || this.size

    if (sort) {
      data = this.sorting(data, sort)
    }

    let entries = splitArray(data, size)
    let total = entries.length
    let displayer = genIndexDisplay({ total })

    Object.assign(this, {
      _rawdata: data,
      _entries: entries,
      _displayer: displayer,
      data: entries[index],
      size,
      total,
      sort,
    })
    this.goto(index)
  }

  sorting(entries, sort) {
    // 需要考虑不同数据类型的排序
    let {key, type = 'desc'} = sort
    let sorter
    sorter = type === 'asc'
      ? (a, b) => a[key] - b[key]
      : (a, b) => b[key] - a[key]
    return entries.sort(sorter)
  }

  switchSize(size) {
    this.init({ size })
  }

  goto(index) {
    let total = this.total
    // 修正index
    index = index >= 0
      ? index < total
        ? index
        : total - 1
      : 0
    this.index = index
    this.indexKeys = this._displayer.show(index)
    this.data = this._entries[index]
  }

  next() {
    this.goto(this.index + 1)
  }
  prev() {
    this.goto(this.index - 1)
  }

  sortBy(sort) {
    this.init({ sort })
  }
}

const test = () => {
  let size = _.random(2, 10)
  let data = Array(_.random(size * 10, size * 30)).fill().map((entry, i) =>
    Object.assign({}, entry, { id: i })
  )
  let page = new Page(data, size)

  function assertion (page, data) {
    return function (size, index) {
      page.should.be.instanceOf(Page)
      page.should.has.properties(['data', 'size', 'index', 'total', 'indexKeys'])
      page._rawdata.should.eql(data)
      page.size.should.eql(size)
      page.total.should.eql(Math.ceil(data.length / size))

      let total = page.total
      index = index > 0
        ? index < total
          ? index
          : total - 1
        : 0

      page.index.should.eql(index)
      // console.log('data:', data)

      // data每个元素的id通项式:
      // id = index * size + i (i of map())
      page.data.forEach((entry, i) =>
        entry.id.should.eql(index * size + i)
      )
    }
  }

  const unittest = (size) => {
    // 断言page
    let _assert = assertion(page, data)

    // 连续测试goto()
    // 测试范围在total +- 3

    let delta = 3
    for (let i = 0 - delta; i < page.total + delta; i++) {
      page.goto(i)

      _assert(size, i)
    }

    // 随机测试goto()
    for (let i = 0; i < 30; i++) {
      let n = _.random(0, page.total - 1)
      page.goto(n)

      _assert(size, n)
    }

    // 连续测试next()
    page.goto(0)
    _assert(size, 0)
    for (let i = 0; i < page.total; i++) {
      let curr = page.index
      page.next()

      _assert(size, curr + 1)
    }

    // 连续测试prev()
    page.goto(page.total - 1)
    _assert(size, page.total - 1)
    for (let i = page.total - 1; i >= 0; i--) {
      let curr = page.index
      page.prev()

      _assert(size, curr - 1)
    }

    // 随机测试next(), prev()
    let n = _.random(0, page.total - 1)
    page.goto(n)
    _assert(size, n)
    for (let i = 0; i < 30; i++) {
      let curr = page.index
      let a = _.random(0, 1)
      a ? page.next() : page.prev()

      _assert(size, curr + (a ? 1 : -1))
    }
  }

  assertion(page, data)(size, 0)
  unittest(size)

  let n = 10
  while (n--) {
    size = _.random(2, 10)
    page.switchSize(size)
    unittest(size)
  }
}

// 目前没有测试sortBy
// test()

module.exports = Page
