function createItem(content, amount) {
  return {
    content: any
    title: 'Item',
    amount: 0,
    price: 0,
    parent: null,
    children: undefined
  }
}


function createList(items) {
  title: 'Order',
  count: 0,
  price: 0,
  parent: null,
  // 怎样添加items?
  children: []
}

// append
function addItem(list, item, childItem, index) {
  // 连接list和item
  item.parent = list
  // 插入item到list
  list.children.push(item)

  // 调用countItem更新数量
  // 调用aggregate更新属性求和
}

function addList() {

}

function updateItem(item, prop) {

}

function removeItem() {

}

function removeList() {

}

function countItem() {}

function aggregate() {}
