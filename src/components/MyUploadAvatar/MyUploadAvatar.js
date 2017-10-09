import React from 'react'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const typeMatched = file.type.search(/\.(gif|jpg|jpeg|png|bmp)$/i) >= 0
  if (!typeMatched) {
    alert('图片类型必须是gif, jpg, jpeg, png, bmg的其中一种')
  }
  return typeMatched
}

class MyUploadAvatar extends React.Component {
  state = {}

  handleChange = () => {

  }

  handleFileChange = () => {
    // 执行action动作
    fetch(action, {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          // 上传完成
          // 返回图片url
          // 执行callback
        } else {
          // 上传失败
        }
      })
      .catch(err => {
        // 上传错误
      })
  }

  render() {
    const imageUrl = this.state.imageUrl;

    return (
      <input type="file" name="" onChange={this.handleFileChange} />
    )
  }
}
