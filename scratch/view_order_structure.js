state = {
  orderDesc: []

  // 从cart信息对象获取
  orders: [
    // 从cart传入的group
    {
      seller: User,  // 通过product提取
      message: '',
      items: [
        {
          product: {price, shipping, discount},
          amount: Number
          priceSum: Number
          discount: Number,
          shipping: Number
          total: Number
        }
      ],
      itemCount: Number
      priceSum: Number
      discount: Number,
      shipping: Number,  // 店内（订单）总运费
      total: Number,
    }
  ]

  // 查询后台返回
  addresses: [
    // 收件人信息对象
    {
      name: String,
      address: String,
      telephone: String,
      isDefault: true,
      // ...
    }
  ],
  usedAddr: {}

  // status: ，

  buyer: User,
  total: Number,
  discount: Number,
  shipping: Number,
  realPay: Number,
  paymentType: String,
}


// order View 结构

.order-stepbar (top)

.order-address

[.order-info]
  .order-orderDesc
  .order-order #order_id (list)
.order-facility
.order-payInfo

.order-submitOrder


status = [
  '查看购物车',
  '拍下商品',
  '付款到支付宝',
  '确认收货',
  '评价',
]

<div class="order-stepbar">
  <img src="" alt="" class="logo">
  <span>Status Bar</span>
</div>
<div class="order-address">
  <fieldset>
    {addresses.map((addr) => (
      <div className="">
        <div className="marker">
          寄送至
        </div>
        <label htmlFor="">
          <input type="radio" name="" id="" value={usedAddr} />
          {addr.address} {addr.name} {addr.telephone}
        </label>
      </div>
      ))}
  </fieldset>
</div>

{/* 结构固定在view内，没必要动态生成 */}
  <div class="order-orderDesc">
    <div className="tr">
      <div className="td">商品信息</div>
      <div className="td">商品属性</div>
      <div className="td">单价</div>
      <div className="td">数量</div>
      <div className="td">优惠</div>
      <div className="td">小计</div>
    </div>
  </div>
{orders.map(() =>
  <div className="order-order">
    <div className="tr">
      <div className="td"></div>
      <div className="td"></div>
      <div className="td"></div>
    </div>
  </div>
)}


<div class="order-payInfo">
  <div className="order-realPay">
    实付款：<span class="realPay-price">{realPay}</span>
  </div>
  <div className="order-confirmAddr">
    {usedAddr}
  </div>
</div>

<div className="order-submitOrder">
  <button>返回购物车</button>
  <button>提交订单</button>
</div>
