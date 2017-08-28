import React from 'react'

class CreateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      property:{
        specs: [
          {
            name: 'price',
            propType: 'basic',
            ctrlType: 'text',
            values: null,
            defaultValue: ''
          }
        ]
      },
      product: {}
    }
  }
}

loadData() {
  fetch('/properties/phone')
    .then(res => res.json())
    .then(property => this.setState({...this.state, property}))
    .catch(console.error)
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
    header: { 'Content-Type': 'application/json'},
    body: JSON.stringify(this.form2json(form))
    .then(console.log)
    .catch(console.error)
})}

render() {
   let { spec } = this.state.property

  return (
    <div>
      {specs.map((spec, i) => {
        if (spec.ctrlType === 'text') {
          <div className="form-group">
            <lable htmlFor={spec.name}>{spec.label}</lable>
            <input type="text" name={spec.name} id={spec.name} />
          </div>
        } else if (spec.ctrlType === 'textarea') {
          <div className="form-group">
            <label htmlFor={spec.name}>{spec.label}</label>
            <textarea name={spec.name} id={spec.name} cols="30" rows="10"></textarea>
          </div>
        } else if (spec.ctrlType === 'select') {
          <div className="form-group">
            <label htmlFor={spec.name}>{spec.label}</label>
            <select name={spec.name} id={spec.name}>
              {spec.values.map((value, i) => (
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>
        } else if (spec.ctrlType === 'checkbox') {
          <div className="form-group">
            <div>{spec.label}</div>
            <div>
              {spec.values.map((value, i) => (
                <label>
                  <input type="checkbox" name={spec.name} value={value}/>{value}
                </label>
              ))}
            </div>
          </div>
        } else if (spec.ctrlType.indexOf(['text', 'number', 'date']) > -1) {
          <div className="form-group">
            <label htmlFor={spec.name}>{spec.label}</label>
            <input type={spec.ctrlType} {...spec.options} />
          </div>
        }
      })}
    </div>
  )
}
