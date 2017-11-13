'use strict'

const path = require('path')

let imgHost = 'http://oyziwoiqy.bkt.clouddn.com'

let banner = [
  '/banner/00_1500x300.jpg',
  '/banner/01_1500x300.jpg',
  '/banner/02_1500x300.jpg',
  '/banner/03_1500x300.jpg',
]

if (imgHost) {
  banner = banner.map(url => path.posix.join(imgHost, url, '?imageslim'))
}

module.exports = {
  banner,
  hot: [],
  floors: [
    {
      id: 0,
      title: '热销商品',
      post: '',
      items: [
        '59f3b8913b3bf5f5c28dad9e',
        '59f3b8913b3bf5f5c28dad9f',
        '59f3b8913b3bf5f5c28dada0',
        '59f3b8913b3bf5f5c28dada1',
        '59f3b8913b3bf5f5c28dada2',
        '59f3b8913b3bf5f5c28dada3',
        '59f3b8913b3bf5f5c28dada4',
        '59f3b8913b3bf5f5c28dada5',
        '59f3b8913b3bf5f5c28dada6',
        '59f3b8913b3bf5f5c28dada7',
      ],
    },
    {
      id: 1,
      title: '新品首发',
      post: '',
      items: [
        '59f3b8913b3bf5f5c28dad9e',
        '59f3b8913b3bf5f5c28dad9f',
        '59f3b8913b3bf5f5c28dada0',
        '59f3b8913b3bf5f5c28dada1',
        '59f3b8913b3bf5f5c28dada2',
        '59f3b8913b3bf5f5c28dada3',
        '59f3b8913b3bf5f5c28dada4',
        '59f3b8913b3bf5f5c28dada5',
        '59f3b8913b3bf5f5c28dada6',
        '59f3b8913b3bf5f5c28dada7',
      ],
    },
  ]
}
