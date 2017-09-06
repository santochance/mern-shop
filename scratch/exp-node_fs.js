function saveUploadedImages(files, dist) {
  return function (product) {
    let album = files.map(file => {
      let newPath = dist + '/' + product._id
      let hash = 'hash'
      let ext = file.name.split('.').slice(-1)[0]
      fs.rename(file.path, `${newPath}/${hash}.${ext}`)
      return newPath
    })

    Product.update({_id: product._id}, {$set: { album }})
  }
}
