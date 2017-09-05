var specProps = [
  {
    name: 'brand',
    label: '品牌',
    ctrlType: 'select',
    required: true,
    values: ['苹果', '惠普', '华硕', '宏碁', '联想', '其他'],
  },
  {
    name: 'cpu',
    label: 'CPU',
    ctrlType: 'text',
    required: true,
    values: ['高通', '联发科', '海思', '德州仪器', '苹果', '三星', '英特尔', '不详', '其他'],
  },
  {
    name: 'model',
    label: '型号',
    required: true,
  },
  {
    name: 'ram',
    label: '内存容量',
    required: true,
  },
  {
    name: 'monitorSize',
    label: '屏幕尺寸',
    required: true,
  },
  {
    name: 'resolution',
    label: '分辨率',
  },
  {
    name: 'listingDate',
    label: '上市日期',
    ctrlType: 'date',
  },
]

var basicProps = [
  { name: 'productName' },
  {
    name: 'images',
    ctrlType: 'file'
  },
  {
    name: 'amount',
    ctrlType: 'number'
  },
  {
    name: 'price',
    ctrlType: 'number'
  },
  {
    name: 'discount',
    ctrlType: 'number'
  },
  {
    name: 'shipping',
    ctrlType: 'number'
  },
  {
    name: 'location',
    // select-group怎样实现？
    ctrlType: 'text'
  },
]
