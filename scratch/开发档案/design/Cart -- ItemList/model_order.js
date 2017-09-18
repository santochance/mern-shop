confirmOrders = {
  status: String,
  buyer: {
    username: String,
    id: String,
  },
  orders: [
    {
      seller: {},
      message: String,
      items: [],
      price: Number,
      discount: Number,
      shipping: Number,
      total: Number,
    },
    // ...
  ],
  // discount: Number,
  // shipping: Number,
  // total: Number,
  // payment: Number,
  realPay: String,
  paymentType: String,
  // shippingInfo: {
    //   serialNumber: String,
    //   shipper: String,
    //   receiver: {/*...*/}
    //   sender: {
    //     name: String,
    //     address: String,
    //     telephone: String,
    //   },
}

// 订单信息
// 买方信息
// 卖方信息
// 商品信息
// 支付信息
// 运送信息

