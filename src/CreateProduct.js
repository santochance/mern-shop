import React from 'react'

import { form2json, getDeep, setDeep } from './form2json.js'

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
            <option value={value}>{value}</option>
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
            <label>
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

  loadData() {
    fetch('/properties?catalog=phone')
      .then(res => res.json())
      .then(props => {
        let property = this.groupBy(props, 'propType')
        this.setState({...this.state, property})
      })
      .catch(console.error)
  }

  componentDidMount() {
    this.loadData()
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
    let { property } = this.state

    console.log('property:', property)

    return (
      <div>
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
    )
  }
}

export default CreateProduct
