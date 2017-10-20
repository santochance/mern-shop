import React from 'react'
import {
  Form, FormGroup, FormControl, ControlLabel,
  InputGroup, Button, Checkbox } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
      <div className="signin" style={{
        // backgroundColor: '#ddd',
      }}>
        <div className="signin-box screen-center" style={{
          width: 360,
          minHeight: 500,
        }}>
          <div className="signin-content" style={{
            padding: 40,
            border: '1px solid #ddd',
            backgroundColor: '#fff',
          }}>
            <div className="title" style={{
              width: '100%',
              fontSize: 18,
              marginBottom: 24,
              textAlign: 'center',
              borderBottom: '1px solid #d8d8d8',
            }} >
              密码登录
            </div>
            <Form action="/api/signin" method="POST" onSubmit={this.handleSubmit}>
              <FormGroup controlId="username">
                <ControlLabel className="sr-only">用户名</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>U</InputGroup.Addon>
                  <FormControl placeholder="用户名"></FormControl>
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel className="sr-only">用户密码</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon>P</InputGroup.Addon>
                  <FormControl type="password" placeholder="登录密码" defaultValue="password"></FormControl>
                </InputGroup>
              </FormGroup>
              <FormGroup controllId="staied" className="flex-lr">
                <Checkbox inline>记住我的登录</Checkbox>
                <div>
                  <a style={{paddingRight: 16}}>忘记密码</a>
                  <Link to="/signup">现在注册</Link>
                </div>
              </FormGroup>
              <Button className="btn btn-primary" type="submit" style={{ display: 'block', width: '100%' }}>登录</Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
