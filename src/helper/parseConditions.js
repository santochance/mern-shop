const _ = require('lodash')
const should = require('should')


function parseConditions(text) {
  // 如果text为空, 下面会返回一个包含空字符串的数组， 即`['']`
  // 边界情况处理: 如果text为j''，返回空数组
  if (!text) return []

  return text.trim().split(/\s+/).map(cond => {
    cond = cond.replace(/(^[^+-])/, '+$1')

    return ({
      have: (cond.match(/[+]([^+-]+)/g) || []).map(seg =>
        seg.replace(/^[+]/, '')
      ),
      not: (cond.match(/[-]([^+-]+)/g) || []).map(seg =>
        seg.replace(/^[-]/, '')
      )
    })
  })
}

const test = () => {
  // let text = '今天+吃饭-时间+内容-一起'
  // let rst = parseConditions(text)
  // console.log('parse %s as %s', text, JSON.stringify(rst, null, 2))

  let sources = []
  let searchText = Array(_.random(1, 3)).fill().map(v => {
    let [text, have, not] = randomText()
    sources.push({
      text,
      have,
      not
    })
    return text
  }).join(' ')

  let rst = parseConditions(searchText)
  // console.log('conditions:', JSON.stringify(rst))

  rst.forEach((cond, i) => {
    let { have, not } = sources[i]
    // console.log('++++++++++++++++++++++++++')
    // console.log('curr condtion:', JSON.stringify(cond))
    // console.log('have:', have)
    // console.log('not:', not)
    should(cond.have).eql(have)
    should(cond.not).eql(not)
  })
}

function randomText () {
  let seed = ['今天', '吃饭', '时间', '内容', '一起']
  let remainder = seed.concat()
  let start = remainder.splice(_.random(seed.length - 1), 1)
  seed.should.containDeep(start)
  seed.should.containDeep(remainder)

  let have = []
  let not = []
  let segs = []
  remainder.forEach(item => {
    _.random(0, 1)
      ? (have.push(item), segs.push('+' + item))
      : (not.push(item), segs.push('-' + item))

  })

  seed.should.containDeep(have)
  seed.should.containDeep(not)

  let rst = start.concat(segs).join('')
  // console.log('random text:', rst)
  return [rst, start.concat(have), not]
}

// let n = 20
// while(n--) {
//   test()
// }

module.exports = parseConditions
