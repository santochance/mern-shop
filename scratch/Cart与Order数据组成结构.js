cart: [
  content: [
    // item
    {
      product: {
        "owner": ''
      },
      amount: 0,
      total: 0,
      selected: false,
      invalid: false,
    }
  ]
  selectedItem: []，
  invalidItems: []
]

// 每个item变化时更新selectAll的checked
items.forEach().on('change', () =>)

// selectAll onChange items跟随selectAll的checked
selectAll.on('change', () => )


content.map(item => {

})


cart = {
  priceSum: 0,
  amountSum: 0,    // 订单商品件数
  groups: [
    // group1
    {
        allSeleted: false
        groupName: '',
        priceSum: 0,    // 组内商品小计
        amountSum: 0,   // 组内商品件数
        items: [
          // item1
          {
            product: {/*...*/},
            amount: 0,   // 单品数量
            total: 0     // 单品小计
            selected: false,
            invalid: false
          }
          // item 2
         {/*...*/}
        ]
    },
    // group2
    {/*...*/}
  ]
  items: []
  allSelected:
}

order.items = order.groups.reduce((arr, group) => arr.concat(group.items), [])


gourps.map(group => {

  group.items.map(item => {
    <div>
      <div className="chk"><input type="checkbox" name="" id=""
        value={item.selected} onChange={(item) => updateChecked(item)} /></div>
    </div>
  })
})


updateChecked(item) {
  item.selected = !item.checked
}

// computed
selectedItems = () => {
  items.filter()
}

// itemSelected --> allSelected
// group
allSelected = group.items.every(item => item.selected)
// order
allSelected = order.items.every()

// allselected --> itemSelected

// allSelected onChange
group.items.forEach(item => (item.selected = allselected))
order.items.forEach(/*...*/)


<CheckList>
  <div>
    <input type="checkbox" name="" id=""/>List Title
  </div>
  <ul>
    <li><input type="checkbox" name="" id=""/>Item 1</li>
    <li><input type="checkbox" name="" id=""/>Item 2</li>
    <li><input type="checkbox" name="" id=""/>Item 3</li>
  </ul>
</CheckList>



checkStatus = [1,2,3,4,5]
allChecked = false

item, i

checkOne(item, index) {}
// 修改checked状态数组


// 计算allChecked


checkAll() {
  // 修改所有checked状态数组的值为allChecked
}

