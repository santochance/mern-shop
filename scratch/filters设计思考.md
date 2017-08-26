品牌
直径/尺寸
用途
相关分类


笔记本电脑
  品牌,
  尺寸,
  硬盘容量,
  适用场景,

家电

手机
  品牌
  尺寸
  操作系统
  网络类型
  筛选条件
    像素
    核心数
    分辨率
    运行内存
  相关分类


// filters的生成
filters: [
  {
    name: 'brand',
    label: '品牌',
    content: []
  },
  {
    name: 'size',
    label: '尺寸',
    content: []
  },
  {
    name: 'os',
    label: '操作系统',
    content: []
  }，
]

adjustedFilters: [
  ...unfoledFilters,
  {
    name: 'folded-filters'
    label: '筛选条件',
    content: [
      ...foldedFilters
    ]
  }
]

// 最多显示5个，超过5个使用4+1方式折叠
// 每个条件最多显示两行，超过则折叠
// 可折叠
// 可多选操作

filters --> adjustedFilters

element renderSize > 2 line
  ? useFold = true
  : useFold = false
// 根据useFold选择component

height = 200

overflow: hidden

max-height: 200px;

overflow: auto;
hidden，scroll

overflow: visible
  渲染尺寸与限制尺寸对比，限制尺寸通过height, max-height等获取
    ? hidden 添加toggle_btn
    : visible

方案二
scrollBox 与 paddingBox是否相等
  如果前者大，说明出滚动条，overflow: hidden，添加toggle_btn


// HTML
div.container
  div.wrapper
    ul.content
      li{Item $}*20


