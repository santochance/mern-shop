
{
  page: {
    size: 5,
    index: 2,
    total: 20,
  }
}


点击页数按钮
 GET '/products/search/:item/result/:page'

'products/search/:item?index=2&size=5'
 app.get('/products/search/:term/result/:page', function (req, res, next) {
  let page = req.params.page
  let size // 怎样传到服务器？

  // 访问搜索缓存数据
  res.json({
    page: {
      size: Number,
      index: Number,
      total: Number,
    },
    content: Array
  })
 })

// 最初的访问
'products/search/:item?size=5'

// 需要传给

// 服务器准备搜索结果数据

let term, size, index

let entries
// 有没有可用缓存，缓存是否适用，都需要等待读取缓存后才能知道
// 读取缓存
let searchCache
// 判断是否有缓存，缓存是否可用
  // both yes
  entries = searchCache
  // no
  entries = searchProductsBy(term, size)

// 假设到这里时已经有分割好的搜索结果
// 根据index返回数据, index默认为1
res.json(entries[index])


function searchProductsBy(term, size) {
  // 使用term查询数据库
  let rst = Products.find({})

  // 根据size分割查询结果
  let splitedRst = spliteArray(rst, size)

  // 存入缓存
  // expire是缓存有效时间
  saveSearchCache(user, term, size, expire, rst)
}

function saveSearchCache(user, term, size, expire, content) {
  SearchCache.insert({})
}


let SearchCacheSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  term: String,
  size: Number,
  expire: {
    type: Number,
    default: Date.now
  },
  content: Array
})
