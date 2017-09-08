Shopping cart

add to cart // 修改order.items
cart's summary // order.total, order.count
checkoutpage // payment

OrderSchema {
  items: [OrderDetailSchema]
}

div.add-to-cart

// 点击先验证登录

// 只有一个按钮
// 点击按钮时创建一个item
// item { product, quantity, total }
// 从按钮的父代组件获取 props.product

div.thumbnail {product}
  item {
    product._id,
    quantity, // 可以调整数量
    total
  }
// 点击按钮时创建一个cartItem，放入state
// button可以根据catItem动态调整状态
// 要减少cartItem的quantity, 只能通过cart summary或details

// 数字调节器 + 按钮

// summary

thumbnail
title
price
优惠信息
total
查看购物车
checkout
sidebar/drawer badge(显示统计数量)

收货选择
勾选框
数字调节器
