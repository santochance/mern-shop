updateItem(item, amout)


let order = createList.append(createItem(product, count))
cart.append(order)

createItem  基于content创建最小entry item 相当于元素
createList


append(list, item) 把item添加到某个list


item.remove()
list.remove(item)

item.update()

list.update(item)

list.clear()

item.update()

cart.appendItem()

order.append()

aggregate

parent

child


root item leaf

item {
  append()
  remove()
  clear()
  detach()
  aggregate()
  destory()
  appendTo()
  update()

}

leaf{
  update()
  appendTo()
  destory()
  detach()
}

root {
  // 不能移除自身
  // 没有appendTo()
  // 不能detach()
  update()
}


list

list, item

list, item

item


