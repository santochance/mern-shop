const random = require('./randoms.js').random

const should = require('should')
const path = require('path')
const fs = require('fs')

/**
 * Helpers
 */
function cso(obj) {
  Object.entries(obj).forEach(([key, value]) => console.log(`Inspect \`${key}\`: ${JSON.stringify(value, null, 2)}`))
}

var dir = 'C:\\Users\\Vincent\\Data\\test_uploads\\599846b6dc7fa139e04a7f44'
var bases = Array(10).fill().map((v, i) => `${i < 10 ? '0' + i : i}.jpg`)
var images = bases.map(base => path.join(dir, base))

/* Testing */

bases.should.match(/\d{2}\.jpg/)

images.should.match(new RegExp(dir.replace(/\\/g, '\\\\')))
for (let [index, img] of images.entries()) {
  img.should.match(new RegExp(dir.replace(/\\/g, '\\\\')))
  img.should.match(new RegExp(bases[index]))
}

var newDir = 'C:\\Users\\Vincent\\Data\\test_uploads_to\\' + Date.now().toString(16)

cso({ images })
cso({ newDir })

function ensureDir(dir) {
  cso({ dir })
  return new Promise((resolve, reject) => {
    fs.access(dir, (err) => {
      should.exist(err)
      if (err) {
        fs.mkdir(dir, (err) => {
          if (err) { /* console.error(err) */ }
          console.log('make new dir')
          resolve(dir)
        })
      } else {
        resolve(dir)
      }
    })
  })
}

function saveImgs(imgPaths, dir, imgNames = []) {
  return new Promise((resolve, reject) => {
    ensureDir(dir)
      .then(dir => {
        return Promise.all(imgPaths.map((oldPath, index) => {
          return new Promise((resolve) => {
            let basename = imgNames[index] || path.basename(oldPath)
            let newPath = path.join(dir, basename)
            // fs.rename(oldPath, newPath, (err) => {
            //   if (err) { /* 暂时忽略 */ }
            //   console.log('file moved to newPath')
            //   resolve(newPath)
            // })
            resolve(newPath)
          })
        }))
      })
      .then(newPaths => resolve(newPaths))
  })
}

saveImgs(images, newDir)
  .then(paths => {
    cso({ paths })
    for (let [index, path] of paths.entries()) {
      path.should.match(new RegExp(newDir.replace(/\\/g, '\\\\')))
      path.should.match(new RegExp(bases[index]))
    }
  })

module.exports = saveImgs
