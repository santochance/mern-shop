const path = require('path')
const fs = require('fs')
const { random } = require('../../src/helper/randoms.js')

function copy(src, dest) {
  fs.readFile(src, (err, buffer) => {
    if (err) return console.error(err)
    fs.writeFile(dest, buffer, (err) => {
      if (err) {
        console.log(err)
        return ensureDir(dest, (err) => {
          fs.writeFile(dest, buffer, (err) => {
            if (err) throw err
            console.log('try to write file again successfuly')

          })
        })
      }

      console.log('write file successfuly')
    })
  })
}


function ensureDir(pathname, callback = () => {}) {
  let segs = path.dirname(pathname).split(path.sep)
  console.log('segs:', segs)

  function next(pathname) {
    console.log('curr is:', pathname)
    let seg = segs.shift()
    if (seg) {
      console.log('continue')
      recur(path.join(pathname, seg))
    } else {
      console.log('finish?')
      callback()
    }
  }

  function recur(pathname) {
    console.log('curr pathname:', pathname)
    fs.access(pathname, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log('!!! pathname does not exist')
          return fs.mkdir(pathname, (err) => {
            if (err) return callback(err)

            console.log('!!! make dir:', pathname)
            next(pathname)
          })
        }

        return callback(err)
      }

      next(pathname)
    })
  }

  recur(segs.shift())

  console.log('finish?')
}


/* Test */
const test = () => {

  var src = 'C:\\Users\\Vincent\\Data\\tmp\\doc.txt'
  var dest = 'C:\\Users\\Vincent\\Data\\tmp\\a\\b\\c\\d\\e\\f\\g\\h'


  var dynamicPath = 'C:\\Users\\Vincent\\Data\\tmp\\'
    + Array(5).fill().map(v => (Date.now() + random(1000))
    .toString(16).slice(-4)).join('\\')

  console.log('dynamicPath:', dynamicPath)
  // ensureDir(dynamicPath)
  // ensureDir(dest)

  copy(src, path.join(dynamicPath, 'deepdeepdeep.txt'))
}

// test()

Object.assign(module.exports, {
  copy,
  ensureDir,
})
