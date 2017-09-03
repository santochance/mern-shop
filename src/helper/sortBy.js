export default function sortBy(entries, key, isDesc = true) {
  let sorter

  if (typeof isDesc === 'number') {
    isDesc = (isDesc !== 1)
  }

  console.log('sort mode:', isDesc ? 'Desc' : 'Asc')

  if (key) {
    if (isDesc) {
      sorter = (a, b) => b[key] - a[key]
    } else {
      sorter = (a, b) => a[key] - b[key]
    }
  } else {
    if (isDesc) {
      sorter = (a, b) => b - a
    } else {
      sorter = (a, b) => a - b
    }
  }

  return entries.sort(sorter)
}

function random(min, max, base = 0, withMax = false) {
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

var test = Array(5).fill().map((obj, index, arr) => ({...obj, order: random(arr.length * 3)}))

console.log('Before:\n', test)

console.log('After Desc:\n', sortBy(test, ['order']))
console.log('After Desc:\n', sortBy(test, ['order'], true))
console.log('After Desc:\n', sortBy(test, ['order'], -1))

console.log('After Asc:\n', sortBy(test, ['order'], false))
console.log('After Asc:\n', sortBy(test, ['order'], 1))

