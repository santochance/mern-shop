Home
  site-nav
    userInfo
    账户管理
    关注
    cart
    fav
    help

  header
    logo + storeInfo + searchBar
  main
    carousel
    list-grid
      thumbnail
      product-desc
      price + btn_addToCart
      ...(other?)
  footer
    site-map-nav
    links-nav
    copyright

ProductSearchResult
  site-nav
  header
    logo + searchBar
  page
    main
      nav-tabs
      breadcrumb
      filters
      resultFilter
      grid/flat
        items
        items
    aside
    aside_horizontal
  fixed_sidebar/btnGroups
  footer

ProductDetail
  site-nav
  header
    logo + location + searchBar + others...
  page
    main
      gallery
      + productInfo
        title
        price
        shipping
        weight
        sales + comments + others
        amount + stores
        addToCart_btn
        shippingArea
      productExtendedInfo
        details
        comments
        售后
      comment
      storeServiceInfo
      售后
      others...
    asideLeft
    asideRight(Recommendation)
  footer

ProductEdit
  site-nav
  header
    logo + location + search + others...
  page
    main
      gallery
        有添加/上传按钮
        pic可以拖放排序
        pic有删除按钮
      + productInfo(使用form)
        title: text
        price: number
        shipping: number
        weight: number
        stores: number
        params: {
          color: text/image
          size: text/image
          material: text/image
          ...
        }
        service: [checkbox/multi-select]
      ExtendedInfo
        - 直接上传html页面
        - 使用控件搭建

  foot

ProductVenue(Market)
  site-nav
  header
    logo + search(Bar)
  page
    page-nav
    catelog(menu)
  page-nav-vertical(偶尔有，通常在Home)

UserManagement
  site-nav
  header
    logo + btns/nav + search
  page
    menu
      ...
      orders
      ...
    main
      filter/page-nav
    aside

SaleManagement
  site-nav
  header
    logo + btns/nav + search
  page
    menu
    main
      filter/page-nav
    ...


Cart
  site-nav
  header
    logo + search
  page
    grid-table（这种和grid-list那种不同，这种是行为主,列为辅）
    list-grid
  footer

Checkout
  site-nav
  page
    logo + orderState
    orderShippingAddress（radio-group)
    orderDesc
    order
      header
      body
      footer
        message
        shippingMethod
        发货时间
        店铺合计
    order
    ...
    payInfo
    orderSubmit
  footer