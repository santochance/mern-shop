{
  items: [
    {
      items: [
        {
          checked
        }
      ],
      checked,
      children,
      parent,
    }
  ],
  checked,
  children
  parent
}


entry.items

var obj = {}
obj.items = []
obj.children = obj.items
obj.items.parent = obj

obj.parent = null
if (obj.items) {
  obj.children = obj.items
  obj.items.parent = obj
} else {
  obj.children = null
}

function addLinks(obj) {
  obj.parent = null
  if (obj.items) {
    obj.children = obj.items
    obj.items.parent = obj
    obj.children.forEach((item) => addLinks(item))
  } else {
    obj.children = null
    return
  }
}

item

item.children

item.parent


function check(item) {
  item.checked = !item.checked
  item.children.forEach((child) => (child.checked = item.checked))
  item.parent.checked = item.parent.children.every((item) => item.checked)
}

item


List
Item

List.addChildren() {
  this.children = Array(4).fill(new Item)
}

function Item() {
  this.parent = null,
  this.children = null,
  this.checked = false,

  this.content = product

  this.amount
  // aggregate for content
  this.price = 0,
  this.discount = 0,
  this.shipping = 0,
  // aggregate for aggregate
  this.total = ...

}

list.append(items) {
  list.children = items
  items.forEach((item) => (item.parent = list))
}

ItemList.prototype.append()


Item(content) {

}

// cart
{
  items: [
    // order
    {
      items: [
        // item
        {
          // items: [
          // ]
          product: {total: }
          total:
          count:
        }
      ]
      count:
      total:
    }
  ]
}

cart    order   good    product
root -> item -> item -> content

数字调节器针对的是
item.count

item.adjust(n) {
  this.count = n
}

item.plus() {
  this.count += 1
}

this.minus() {
  this.count += -1
}

item.remove() / item. clear() {
  this.parent.children.splice(index, 1)
}

item.aggreage(curr, prev) {

}

