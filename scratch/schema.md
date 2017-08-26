product
  id | \_id,
  name | title: String, required,
  extended_desc | description: String, required,
  breif_desc: String,

  original_price: Number, >=0,
  current_price | price: Number, >=0,
  shipping: Number, >=0, required,
  stock: Number, >=0, default: 0,
  sales: Number, >=0, default: 0,

  brand,
  published_at,
  serial_number,

  size,
  color,
  meterial,

  created_at,
  updated_at,

  details
  comments

