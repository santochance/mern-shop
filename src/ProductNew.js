import React from 'react'
import {
  Form, FormGroup,
  FormControl, ControlLabel, Col,
  Checkbox, Radio, Button,
} from 'react-bootstrap'

import { form2json } from './helper/form2json.js'

import './ProductNew.css'

class ProductNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    let fields = [
      {
        name: 'productName',
        label: '商品名称',
        type: 'text',
      },
      {
        name: 'description',
        label: '商品描述',
        type: 'text',
      },
      {
        name: 'price',
        label: '价格',
        type: 'number',
      },
      {
        name: 'stock',
        label: '数量',
        type: 'number',
      },
      {
        name: 'shipping',
        label: '运费',
        type: 'number',
      },
      /*
      {
        name: 'album',
        label: '商品图片',
        type: 'file',
        props: {
          multiple: true
        }
      },
       */
    ]

    this.setState({...this.state, fields})
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

  submitProduct(e) {
    e.preventDefault()
    // let data = form2json(e.target)
    // this.sendData(data)
    // let formData = new FormData()
    // let controls = e.target.elements
    // Object.keys(controls).forEach(name => {
    //   if (isNaN(Number(name)) {
    //     formData[name] = controls[name].value
    //   }
    // })

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

  render() {
    let { fields, files, projectedImg } = this.state

    if (!fields) return null

    return (
      <div className="product-new container">
        <div className="row">
          <h4>商品基本属性</h4>
        </div>
        <div className="row">
          <Form horizontal onSubmit={(e) => this.submitProduct(e)}>
            <div className="col-md-6">
              {fields.map(field => (
                <SmartField field={field} />
              ))}
            </div>
            <FormGroup className="col-md-6">
              <Col componentClass={ControlLabel} sm={2} md={3}>商品图片</Col>
              <Col sm={8} md={9}>
                <FormControl className="addFile-btn" type="file" name="album" multiple accept="image/*" onChange={(e) => this.addFiles(e.target.files)}/>
                {files && (
                  <ul className="fileList-wrapper">
                    {files.map((file, i) => (
                      <li key={i} className="fileList-item">
                        <img src={file} alt="" height="100" width="100" onMouseOver={(e) => this.project(e)} />
                        <Button className="removeFile-btn" bsSize="xs" onClick={() => this.removeFile(file)}>删除</Button>
                      </li>
                    ))}
                  </ul>
                )}
                {/*
                <div className="preview">
                  <img src={projectedImg} alt=""/>
                </div>
                */}
              </Col>
            </FormGroup>
            <div className="col-sm-12">
              <Button type="submit" bsStyle="success">保存</Button>{'  '}
              <Button bsStyle="danger">取消</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const SmartField = (props) => {
  let { field } = props

  if (field.type === 'checkbox') {
    return (
      <div>Placeholder for Checkbox</div>
    )
  } else if (field.type === 'radio') {
    return (
      <div>Placeholder for Radio</div>
    )
  } else {
    return (
      <FormGroup controlId={field.name}>
        <Col componentClass={ControlLabel} sm={2} md={3}>
          {field.label}
        </Col>
        <Col sm={8} md={9}>
          <FormControl type={field.type} {...field.props} />
        </Col>
      </FormGroup>
    )
  }

}

export default ProductNew
