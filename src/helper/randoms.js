function random(min, max, base = 1, withMax = true) {
  let _min, _max
  if (arguments.length < 2) {
    _max = min
    _min = base
  } else {
    _max = max
    _min = min
  }

  return Math.floor(Math.random() * (_max - _min + (withMax ? 1 : 0)) + _min)
}

// randomTimeStamp
function randomDate(min, max) {
  // console.log('min:', Date.parse(min))
  // console.log('max:', Date.parse(max))
  let rst = random(Date.parse(min), Date.parse(max))
  // console.log('rst:', rst)
  return rst
}

const dateMethods = {
  years: [Date.prototype.setFullYear, Date.prototype.getFullYear],
  months: [Date.prototype.setMonth, Date.prototype.getMonth],
  days: [Date.prototype.setDate, Date.prototype.getDate],
  hours: [Date.prototype.setHours, Date.prototype.getHours],
  minutes: [Date.prototype.setMinutes, Date.prototype.getMinutes],
  seconds: [Date.prototype.setSeconds, Date.prototype.getSeconds],
  milseconds: [Date.prototype.setMilseconds, Date.prototype.getMilseconds],
}
function datetimeDelta(delta) {
  let segments = Object.keys(delta)
  if (!segments.length) return null

  let deltaValue = 0
  segments.forEach(key => {
    let methods = dateMethods[key]
    if (methods) {
      let [setter, getter] = methods
      let origin = new Date(0)
      deltaValue += setter.call(origin, getter.call(origin) + delta[key])
    }
  })
  return deltaValue
}

function randomWord(minLen = 3, maxLen = 7) {
  let aCode = 'a'.charCodeAt()
  let zCode = 'z'.charCodeAt()
  let rst = Array(random(minLen, maxLen)).fill().map(value =>
    String.fromCharCode(random(aCode, zCode))
  )
  return rst[0].toUpperCase() + rst.slice(1).join('')
}

function randomPharse(min = 2, max) {
  max = max || min
  return Array(random(min, max)).fill().map(() => randomWord()).join(' ')
}
function test() {

  console.log('------- test randomDate -------')
  console.log(new Date(randomDate('2008-01-01', '2017-06-01')))
  console.log(new Date(randomDate('2008-01-01', '2017-06-01')))
  console.log(new Date(randomDate('2008-01-01', '2017-06-01')))
  console.log(new Date(randomDate('2008-01-01', '2017-06-01')))
  console.log(new Date(randomDate('2008-01-01', '2017-06-01')))

  console.log('------- test randomWord -------')
  console.log(randomWord())
  console.log(randomWord())
  console.log(randomWord())
  console.log(randomWord())
  console.log(randomWord())

  console.log('------- test randomPharse -------')
  console.log(randomPharse())
  console.log(randomPharse())
  console.log(randomPharse())
  console.log(randomPharse())
  console.log(randomPharse())

  console.log(randomPharse(1))
  console.log(randomPharse(1))
  console.log(randomPharse(1))
  console.log(randomPharse(1))
  console.log(randomPharse(1))

  console.log(randomPharse(3))
  console.log(randomPharse(3))
  console.log(randomPharse(3))
  console.log(randomPharse(3))
  console.log(randomPharse(3))

  console.log(randomPharse(1, 3))
  console.log(randomPharse(1, 3))
  console.log(randomPharse(1, 3))
  console.log(randomPharse(1, 3))
  console.log(randomPharse(1, 3))

  console.log(randomPharse(2, 4))
  console.log(randomPharse(2, 4))
  console.log(randomPharse(2, 4))
  console.log(randomPharse(2, 4))
  console.log(randomPharse(2, 4))

}

Object.assign(module.exports, {
  random,
  randomDate,
  randomPharse,
})
