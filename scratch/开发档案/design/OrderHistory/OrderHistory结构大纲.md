      .nav-tabs
      .search-bar
.search-bar
.filter-bar
.main-content
  .history-orderDesc
  .nav-row
  .history-orders
    {orders.map(order =>
      .order-content
        .thead
          .cell-orderInfo
            .check
            .order-created
            .order-serialNum
          .cell-seller
        .tbody
          {(items.map(item =>
            .tr
              .td.cell-product
                .product-image
                .product-info
              .td.cell-price
              .td.cell-amount
              .td.cell-refund
              {index === 0 ? (
                .td.cell-realPay
                .td.cell-status
                ) : (
                  Array(2).fill().map(() => .td.cell-empty)
                )
              }
          )}
    )}
.pagination
