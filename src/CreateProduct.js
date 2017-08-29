import React from 'react'

const SmartForm = (props) => {
  let { field } = props

  if (['text', 'number', 'date', 'file'].indexOf(field.ctrlType) > -1) {
    return (
      <div className="form-group">
        <label htmlFor={field.name}>{field.label}</label>
        <input type={field.ctrlType} name={field.name} id={field.name} />
      </div>
    )
  } else if (field.ctrlType === 'textarea') {
    return (
      <div className="form-group">
        <label htmlFor={field.name}>{field.label}</label>
        <textarea name={field.name} id={field.name} cols="30" rows="10"></textarea>
      </div>
    )
  } else if (field.ctrlType === 'select') {
    return (
      <div className="form-group">
        <label htmlFor={field.name}>{field.label}</label>
        <select name={field.name} id={field.name}>
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
              <input type="checkbox" name={field.name} value={value}/>{value}
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

  form2json(form) {
    // ...
    // form.elements.reduce()
    // return data
  }

  sendData() {
    let form

    fetch('/products', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.form2json(form))
    })
      .then(console.log)
      .catch(console.error)
  }

  render() {
    let { property } = this.state
    let { spec, basic } = this.state.property

    if (!spec || !basic) return null

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

        {basic.map((item, i) => (
          <div>
            <SmartForm field={item} key={i} />
          </div>
        ))}
        <hr/>
        {spec.map((item, i) => (
          <div>
            <SmartForm field={item} key={i} />
          </div>
        ))}
        {Object.keys(property).map((group, i) =>
          property[group].map((prop, j) => (
            <SmartForm group={group} field={prop} />
          ))
        )}
      </div>
    )
  }
}

export default CreateProduct
