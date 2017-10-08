filterItemsBy(items, conditions, dataKeys) {
  // 对于数据数据中的每一个item
  items.filter(item =>
    // 如果它的任一键值对满足条件则返回真
    Object.entries(item)
      .some(([key, value]) =>
        // 条件是key在dataKeys数组中
        dataKeys.indexOf(key) >= 0 &&
          // 并且value符合任一condition的要求
          conditions.some(c =>
            // 要求是value能够逐一匹配have数组但不匹配not数组的元素
            c.have.every(key => value.search(key) >= 0) &&
              c.not.every(key => value.search(key) <0)
          )
      )
  )
}
