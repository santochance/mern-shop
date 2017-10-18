import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

function form2json(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => ({...data, [name]: controls[name].value || undefined}), {})
  // rst['username'] && (rst['username'] += Date.now())
  return rst
}

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = form2json(e.target)

    console.log('data to be submited:', data)

    this.props.login(data)
  }

  render() {
    return (
      <Form action="/api/signin" method="POST" onSubmit={this.handleSubmit} style={{
        width: '80%',
        margin: 'auto',
        marginTop: '100px'
      }}>
        <FormGroup controlId="username">
          <ControlLabel>Username</ControlLabel>
          <FormControl defaultValue="santochance"></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" defaultValue="password"></FormControl>
        </FormGroup>
        <Button type="submit">登录</Button>
      </Form>
    )
  }
}
