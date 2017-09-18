// 设计草稿

```js
  loadData(query) {
    let queryStr = encodeQueryStr(query)
    let url = path + queryStr
    fetch(url)
      .then()
  }

  paginate(data, pageCfg) {
    // 根据pageCfg分组data
    // 生成page对象
    var page = {}
    // 根据index生成View

    function genView(index) {}

    var view = genView(index)

    function gotoIndex(index) {}
  }

  // 简单情况下, data一开始就是全体数据
  // 数据量多的情况下, data会经过服务端分组
  // 需要一个远程的page对象

  var remotePage = {}

  然后localPage和remotePage建立关联


  例如，
  remotePage = {
    size: 5,
    index: 0,
    total: 3,
  }
  localPage = {
    size: 1,
    index: 0,
    total: remotePage.size / this.size
  }
  // gotoLocalIndex(10)

  // 超范围跳转
    // oldRemotePageIndex !== new RemotePageIndex
    // 发出新请求

  // 预加载
```

// 调用

```js
import Page from ''

let page = new Page()

comp.page = page

changePageSize(size) {
  this.page = new Page(data, size)
}

search onClick

this.page.loadData(url, {term: 'hp'})

this.page.next()
this.page.prev()
this.page.goto()
this.page.update()
```

// 类定义

```js
class Page {
  constructor(data, size) {
    this._data = data
    this.size = size
    this.index = 0
    this.total = splitArray(data, size).length
    this.currData = this.currData
  }

  loadData (url, query) {
    let encodedUrl
    fetch(encodeUrl)
  }

  paginate (data, pageCfg) {

  }

  gotoPage (index) {
    this.index = index
  }

  genView (index) {

  }
}
```

