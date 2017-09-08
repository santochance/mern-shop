const { random } = require('./randoms.js')
const { copy, ensureDir } = require('./fs-copy.js')

const should = require('should')
const path = require('path')
const fs = require('fs')
const util = require('util')

/**
 * Helpers
 */
function cso(obj) {
  Object.entries(obj).forEach(([key, value]) => console.log(`Inspect \`${key}\`: ${JSON.stringify(value, null, 2)}`))
}

function ensureDirAsync(dir) {
  // cso({ dir })
  return new Promise((resolve, reject) => {
    ensureDir(dir, (err) => {
      if (err) {
        reject(err)
      }
      resolve(dir)
    })
  })
}

function saveImgs(imgPaths, newDir, imgNames = []) {
  console.log('new Dir:', newDir)
  return new Promise((resolve, reject) => {
    ensureDirAsync(newDir)
      .then(dir => {
        return new Promise((resolve, reject) => {
          fs.access(dir, (err) => {
            if (err) reject(err)
            resolve(dir)
          })
        })
      })
      .then(dir => {
        console.log('has ensured dir:', dir)
        dir.should.be.String().and.not.empty()
        return dir
      })
      .then(dir => {
        return Promise.all(imgPaths.map((oldPath, index) => {
          return new Promise((resolve) => {
            let basename = imgNames[index] || path.basename(oldPath)

            dir.should.be.String().and.not.empty()
            basename.should.be.String().and.not.empty()

            let newPath = path.join(dir, basename)
            // Sync placeholder
            // resolve(newPath)

            copy(oldPath, newPath, (err) => {
              if (err) {
                reject(err)
              }
              console.log('copy file \n  from  %s \n    to  %s:', oldPath, newPath)
              // 注意这里是newPath, 因为在map()内
              resolve(newPath)
            })
          })
        }))
      })
      // 注意这里是newPaths
      .then(newPaths => resolve(newPaths))
      .catch(console.error)
  })
}

/* Test */
const test = (testDir) => {
  console.log('=============== Run Test =================')

  // 源文件夹
  var dir = testDir || 'C:\\Users\\Vincent\\Data\\test_uploads\\599846b6dc7fa139e04a7f44'
  // var bases = Array(4).fill().map((v, i) => `${i < 10 ? '0' + i : i}.jpg`)

  // Assert: images指向的图片应该存在
  fs.readdir(dir, (err, files) => {
    if (err) throw err

    console.log(files)
    files.should.not.empty()

    // 用于测试的pathname数组
    // images是一组图片的pathname
    var images = files.map(base => path.join(dir, base))
    // 目标文件夹
    var newDir = path.join('C:\\Users\\Vincent\\Data\\test_uploads_to\\', Date.now().toString(16), '\\')

    // cso({ images })
    cso({ dir, newDir })

    /* Assertion */

    // bases.should.match(/\d{2}\.jpg/)

    images.should.match(new RegExp(dir.replace(/\\/g, '\\\\')))
    for (let [index, img] of images.entries()) {
      img.should.match(new RegExp(dir.replace(/\\/g, '\\\\')))
      img.should.match(new RegExp(files[index]))
    }

    fs.access(newDir, (err) => {
      // Assert: 开始前目标文件夹应该不存在
      should.exist(err)

      // 把images保存到目标文件夹
      saveImgs(images, newDir)
        .then(pathnames => {

          // cso({ pathnames })

          for (let [index, pathname] of pathnames.entries()) {
            pathname.should.match(new RegExp(newDir.replace(/\\/g, '\\\\')))
            pathname.should.match(new RegExp(files[index]))
          }

          // Assert: 目标文件夹应该存在复制的新文件
          fs.readdir(newDir, (err, newFiles) => {
            should.not.exist(err)
            newFiles.should.deepEqual(files)
          })
        })
        .catch(console.error)
    })
  })

}

test()
test('C:\\Users\\Vincent\\Data\\test_uploads\\599846b6dc7fa139e04a7f45')

module.exports = saveImgs
