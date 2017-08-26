/* global fetch */

import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function form2json(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => ({...data, [name]: controls[name].value || undefined}), {})
  // 另一种写法
  // names.reduce((data, name) => {
  //   let value = controls[name].value
  //   value ? {...data, [name]: value} : data
  // }, {})
  rst['username'] && (rst['username'] += Date.now())
  return rst
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    }

    this.createUser = this.createUser.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = form2json(e.target)

    console.log('data to be submitted:', data)

    fetch('/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        res.json().then(user => {
          console.log('user in session: ', user)
          window.auth = {
            ...user,
            isAuthed: true
          }
          this.setState({ redirectToReferrer: true })
          // this.props.history.push('/')
        })
      } else {
        res.json().then(console.error)
      }
    }).catch(console.error)

    // **临时**
    // setTimeout(() => fetch('/signout'), 500)
  }

  createUser() {
    fetch('/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      // 需要自己手动构建form数据吗？
      body: JSON.stringify({})
    })
  }

  render() {
    // from获取上一location状态
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    // redirectToReferrer is in the local state
    const { redirectToReferrer } = this.state

    console.log('from:', from)
    console.log('redirectToReferrer: %s', redirectToReferrer)

    // redirectToReferrer作为flag判断是否重定到referrer

    // 参考例子是当点击login按钮时自动验证并设置redirectToReferrer

    // 通过点击site-nav进入到login的不设置referrer flag
    // 由于权限保护页面引导验证过程进入到login则设置此flag
    // 可以考虑通过props传入
    if (redirectToReferrer) {
      return <Redirect to={ from } />
    }

    return (
      <Form action="/api/signup" method="POST" style={{
        width: '80%',
        margin: 'auto',
        marginTop: '100px'
      }}  onSubmit={this.handleSubmit}>
        <FieldGroup
          id="firstName"
          type="text"
          label="First Name"
        />
        <FieldGroup
          id="lastName"
          type="text"
          label="Last Name"
        />
        <FieldGroup
          id="username"
          type="text"
          label="Username"
          placeholder="Enter username..."
          defaultValue="test"
        />
        <FieldGroup
          id="email"
          type="email"
          label="Email"
          placeholder="Enter email..."
        />
        <FieldGroup
          id="password"
          type="password"
          label="Password"
          placeholder="Enter password..."
          defaultValue="password"
        />

        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default Signup
