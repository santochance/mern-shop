import React from 'react'

import { form2json, getDeep, setDeep } from './helper/form2json.js'

import './ProductPreview.css'

const SmartForm = (props) => {
  let { group, field } = props

  if (!field) return null

  let fullname = !group || group === 'basicProps' ? field.name : `${group}.${field.name}`

  if (['text', 'number', 'date', 'file'].indexOf(field.ctrlType) > -1) {
    return (
      <div className="form-group">
        <label htmlFor={fullname}>{field.label}</label>
        <input type={field.ctrlType} name={fullname} id={fullname} />
      </div>
    )
  } else if (field.ctrlType === 'textarea') {
    return (
      <div className="form-group">
        <label htmlFor={fullname}>{field.label}</label>
        <textarea name={fullname} id={fullname} cols="30" rows="10"></textarea>
      </div>
    )
  } else if (field.ctrlType === 'select') {
    return (
      <div className="form-group">
        <label htmlFor={fullname}>{field.label}</label>
        <select name={fullname} id={fullname}>
          {field.values && field.values.map((value, i) => (
            <option key={i} value={value}>{value}</option>
          ))}
        </select>
      </div>
    )
  } else if (field.ctrlType === 'checkbox') {
    return (
      <div className="form-group">
        <div>{field.label}</div>
        <div>
          {field.values && field.values.map((value, i) => (
            <label key={i}>
              <input type="checkbox" name={fullname} value={value}/>{value}
            </label>
          ))}
        </div>
      </div>
    )
  }
}

class CreateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      catalogs: [],
      property: {
        specProps: [],
        basicProps: []
      },
      product: {
        basicProps: {
          productName: String,
          amount: Number,
        },
        specProps: {
          brand: String
        },
        saleProps: {}
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.loadCatalogs()
  }

  groupBy(items, filter) {
    let groups = []
    let rst = {}
    items.forEach((item) => {
      let value = item[filter]
      groups.some((group) => {
        return group === value && rst[value].push(item)
      }) || (
        groups.push(value),
        rst[value] = [item]
      )
    })

    // 修改分组名称
    for (let key of Object.keys(rst)) {
      rst[key + 'Props'] = rst[key]
      delete rst[key]
    }
    return rst
  }

  /*
  loadData() {
    Promise.all([
      fetch('/properties?catalog=phone')
        .then(res => res.json())
        .then(props => {
          return this.groupBy(props, 'propType')
        })
        .catch(console.error),
      fetch('/catalogs')
        .then(res => res.json())
        .then(catalogs => {
          catalogs.some((cata, i) => cata.name.match(/all/i) && catalogs.splice(i, 1))
          return catalogs
        })
        .catch(console.error),
    ])
      .then(data => this.setState({
        ...this.state,
        property: data[0],
        catalogs: data[1],
      }))
  }
   */

  loadCatalogs() {
    fetch('/catalogs')
      .then(res => res.json())
      .then(catalogs => {
        catalogs.some((cata, i) => cata.name.match(/all/i) && catalogs.splice(i, 1))
        this.setState({...this.state, catalogs})
      })
      .catch(console.error)
  }

  loadProperties(catalog) {
    fetch('/properties?catalog=' + catalog)
      .then(res => res.json())
      .then(props => {
        let property = this.groupBy(props, 'propType')
        this.setState({...this.state, property})
      })
      .catch(console.error)
  }

  sendData(data) {
    fetch('/products', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(console.log)
      .catch(console.error)
  }

  handleSubmit(e) {
    console.log('this in handleSubmit:', this)
    e.preventDefault()
    let data = form2json(e.target)

    console.log('data is:', data)

    this.sendData(data)
  }

  render() {
    let { property, catalogs } = this.state

    console.log('property:', property)
    console.log('catalogs:', catalogs)

    return (
      <div style={{
        display: 'flex'
      }}>
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '50px',
          zIndex: 5,
          height: '500px',
          overflow: 'auto',
        }}>
          propType: spec
          <pre>{JSON.stringify(property.specProps, null, 2)}</pre>
          propType: basic
          <pre>{JSON.stringify(property.basicProps, null, 2)}</pre>
        </div>
        <div className="product-images">
          <h4>商品图片</h4>
          <ProductPreview />
        </div>
        <div className="product-info">
          <form action="">
            <div className="form-group">
              <label htmlFor="">选择商品类目：</label>
              <select name="" id="" onChange={(e) => this.loadProperties(e.target.value)}>
                <option>------</option>
                {catalogs.map((catalog, i) => (
                  <option key={i} value={catalog.name}>{catalog.name}</option>
                ))}
              </select>
            </div>
          </form>
          <form action="/products" method="POST" onSubmit={this.handleSubmit} >
            <div>
              <h4>商品基本属性</h4>
              <div>
                {['productName', 'price', 'shipping', 'localtion'].map((key, i) => (
                  <SmartForm key={i} field={property.basicProps.find(v => v.name === key)}></SmartForm>
                ))}
              </div>
            </div>
            <div>
              <h4>商品规格属性</h4>
              {property.specProps.map((prop, i) => (
                <SmartForm key={i} group="specProps" field={prop}></SmartForm>
              ))}
            </div>
            {/*
            {Object.keys(property).map((group, i) =>
              property[group].map((prop, j) => (
                <SmartForm key={j} group={group} field={prop} />
              ))
            )}
            */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

class ProductPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  onFilesChange(e) {
    // this.setState({...this.state, files: Array.from(e.target.files)})
    // this.handleFiles(e.target.files)
    this.addFiles(e.target.files)
  }

  readAsDataURLAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.onerror = (e) => {
        reject(e.target.result)
      }
      reader.readAsDataURL(file)
    })
  }

  handleFiles(files) {
    files = Array.from(files).filter(file => file.type.search(/^image\//) > -1)

    Promise.all(
      files.map(file => this.readAsDataURLAsync(file))
    ).then(files => this.setState({...this.state, files}))
  }

  addFiles(files) {
    Promise.all(
      Array.from(files).map(file => this.readAsDataURLAsync(file))
    ).then(newFiles => {
      files = (this.state.files || []).concat(newFiles)
      this.setState({...this.state, files})
    })
  }

  removeFile(index) {
    let { files } = this.state
    files.splice(index, 1)
    this.setState({...this.state, files})
  }

  project(e) {
    let projectedImg = e.target.src
    this.setState({...this.state, projectedImg})
  }

  upload(files) {

  }

  render () {
    let { files, projectedImg } = this.state
    console.log('files:', files)

    return (
      <div className="product-preview" style={{
        // width: '300px'
      }}>
        <div className="projection"></div>
        <div className="thumbnails">
          <ul style={{ display: 'flex' }}>
            {files.map((file, i) => (
              <li key={i}>
                <img src={file} alt="" height="100" width="100" />
              </li>
            ))
            }
          </ul>
        </div>
        <div className="upload">
          <label htmlFor="productImages">请上传商品图片：</label>
          <input type="file" name="images" id="productImages" multiple onChange={(e) => this.onFilesChange(e)} />
        </div>

        <div>
          <label htmlFor="uploadFile" className="btn btn-info">添加商品图片</label>
          <input type="file" name="uploadFile" id="uploadFile" multiple accept="image/*" style={{display: 'none'}}
            onChange={(e) => this.onFilesChange(e)} />
        </div>
        <div className="product-images">
          <div className="title">商品图片</div>
          <div className="uploadImgs">
            <label htmlFor="upload">选择图片</label>
            <input type="file" name="upload" id="upload" accept="image/*" multiple style={{ display: 'none' }}
              onChange={(e) => this.onFilesChange(e)} />
            {/*
            {projectedImg && (<div className="preview">
              <img src={projectedImg} alt=""/>
            </div>)}
            */}

            <div className="preview">
              <img src={projectedImg || ''} alt=""/>
            </div>

            <div className="fileList">
              <ul style={{ display: 'flex' }}>
                {files.map((file, i) => (
                  <li key={i} className="fileList-item"
                    onMouseOver={(e) => this.project(e)}
                    // onMouseOut={() => this.setState({...this.state, projectedImg: null})}
                  >
                    <button className="removeFile btn btn-info btn-xs" onClick={() => this.removeFile(i)}>删除</button>
                    <img src={file} alt="" height="100" width="100" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="zoomIn"></div>
      </div>
    )
  }
}

export default CreateProduct
