// ComfirmOrder 结构大纲

```
.order-confirm
  .order-stepbar
  .order-address
  .order-orderDesc
    {确认订单}
    .tr.desc-row
      .th.desc-info{店铺宝贝}
      .th.desc-param{商品属性}
      .th.desc-price{单价}
      .th.desc-quantity{数量}
      .th.desc-discount{优惠方式}
      .th.desc-sum{小计}
  .order-list
    {(
      .order-content
        .order-shopInfo
          .badge
          + .shop-name
          + .shop-seller
        .order-items
          {{(
            .tr.item-content
              .td.cell-info
              .td.cell-param
              .td.cell-price
              .td.cell-quantity
              .td.cell-discount
              .td.cell-sum
          )}}
        .order-ext
          .order-message
          .order-delivery
            .delivery-title
            .delivery-select
              .select-info
              .select-price
        .order-total
          {(含运费)}
          .order-sum
          }
    )}
  .order-payInfo
    .payInfo-wrapper
      .order-realPay
      .order-confirmAddr
        .confirmAddr-addr
        .confirmAddr-user
  .order-submitOrder
    .submitOrder-wrapper
      .go-back
      .go-submit
```


