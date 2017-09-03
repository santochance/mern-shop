# View-ProductList Outline

## Data

```js
var ProductSchema = new Schema({
  productName: { type: String, /* required: true, */ trim: true },
  price: { type: Number/*, required: true */, min: 0 },
  stock: { type: Number, default: 1 },
  description: String,
  imageBin: { data: Buffer, contentType: String },
  imageUrl: String,
  album: [{ type: String }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Catalog', index: true }],

  basicProps: {},
  specProps: {},
}).index({
  'title': 'text',
  'description': 'text'
})
```

## Structure

```
.search-bar
.grid-total
  .grid-left
    .breadcrumb
    .filter-selections
    .grid-nav
    .grid
      .grid-item.product
        .imgWrap
          img
        .title
        + .description
        .price
        + .sale?
  + .grid-right
  .sidebar_hori.hotselled
```

## Style

```css


```
