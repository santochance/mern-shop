/*
  Bootstrap 版本
*/
import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap'

import { Link, Redirect } from 'react-router-dom'

function form2json(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => ({...data, [name]: controls[name].value || undefined}), {})
  return rst
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = form2json(e.target)

    // console.log('data to be submitted:', data)

    this.props.register(data)
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
      <div className="signup">
        <div className="signup-box center-block pa-center" style={{
          width: 360,
        }}>
          <div className="signup-content" style={{
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
            }}>注册账号</div>
            <Form action="/api/signup" method="POST" onSubmit={this.handleSubmit}>
              <FieldGroup
                id="username"
                type="text"
                label="用户名"
                placeholder="您的账户名和登录名"
              />
              <FieldGroup
                id="password"
                type="password"
                label="设置密码"
                placeholder="建议至少使用两种字符组合"
              />
              <FieldGroup
                id="password2"
                type="password"
                label="确认密码"
                placeholder="请再次输入密码"
              />
              <FieldGroup
                id="email"
                type="email"
                label="电子邮箱"
                placeholder="请输入电子邮箱"
              />
              <div className="clearfix links" style={{ marginBottom: 12 }}>
                <Link to={{
                  pathname: '/signin',
                  state: { from }
                }} className="fr">使用已有账号登录</Link>
              </div>
              <Button className="btn btn-primary register-btn" type="submit" style={{ display: 'block', width: '100%' }}>注&nbsp;册</Button>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default Signup
