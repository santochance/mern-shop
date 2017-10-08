const parseConditions = require('./parseConditions.js')

function assertInRange(min, max) {
  return function isValueInRange(value) {
    return value >= min && value <= max
  }
}

function assertMatchConditions(conditions) {
  console.log('conditions:', conditions)

  return function isValueMatchConds(value) {
    // 边界情况处理：如果conditions不存在或为空数组, 返回直接返回true
    if (!conditions || !conditions.length) return true

    return conditions.some(c =>
      c.have.every(key => value.search(key) >= 0) &&
        c.not.every(key => value.search(key) <0)
    )
  }
}

function itemAssertion(item, dataKeys, valueAssertion) {

  return Object.entries(item)
    .some(([key, value]) =>
      (dataKeys ? dataKeys.indexOf(key) >= 0 : true)  && valueAssertion(String(value))
    )
}

function searchWith(entries, { dataKeys, mode = 'text', text, max = Infinity, min = -Infinity }) {
  // 边界情况处理: text mode时如果text为空字符串，直接返回
  if (mode === 'text' && !text) return entries

  let valueAssertion = mode === 'range'
    ? assertInRange(min, max)
    : assertMatchConditions(parseConditions(text))

  return entries.filter(entry =>
    itemAssertion(entry, dataKeys, valueAssertion)
  )
}

module.exports = searchWith
