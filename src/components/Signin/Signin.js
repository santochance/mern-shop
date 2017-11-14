import React from 'react'
import {
  Form, FormGroup, FormControl, ControlLabel,
  InputGroup, Button, Checkbox } from 'react-bootstrap'
import { Icon } from 'antd'
import { Link, Redirect } from 'react-router-dom'

import './Signin.css'

function form2json(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => ({...data, [name]: controls[name].value || undefined}), {})
  // rst['username'] && (rst['username'] += Date.now())
  return rst
}

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reserved: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = form2json(e.target)

    // console.log('data to be submited:', data)

    this.props.login(data)
  }

  render() {
    let { isLogined } = this.props
    let { from } = this.props.location.state || { from: {pathname: '/'} }
    if (isLogined) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="signin" style={{
        // backgroundColor: '#ddd',
      }}>
        <div className="signin-box center-block pa-center" style={{
          width: 360
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
                  <InputGroup.Addon style={{ padding: '6px 8px' }}>
                    <Icon type="user" style={{fontSize: 20}}/>
                  </InputGroup.Addon>
                  <FormControl placeholder="用户名" defaultValue="santochance"></FormControl>
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="password">
                <ControlLabel className="sr-only">用户密码</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon style={{ padding: '6px 8px' }}>
                    <Icon type="lock" style={{fontSize: 20}}/>
                  </InputGroup.Addon>
                  <FormControl type="password" placeholder="登录密码" defaultValue="password"></FormControl>
                </InputGroup>
              </FormGroup>
              <FormGroup className="flex-lr">
                <Checkbox inline defaultChecked>记住我的登录</Checkbox>
                <div className="links">
                  <a style={{paddingRight: 16}}>忘记密码</a>
                  <Link to={{
                    pathname: '/signup_0',
                    state: { from }
                  }}>现在注册</Link>
                </div>
              </FormGroup>
              <Button className="btn btn-primary login-btn" type="submit" style={{ display: 'block', width: '100%' }}>登&nbsp;录</Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signin
