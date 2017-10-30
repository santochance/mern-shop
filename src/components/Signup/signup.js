/*
  Ant Design 版本
 */

import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

class NormalSignupForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="signup-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入用户名!'}]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{required: true, message: '请输入电子邮箱!'}]
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} type="email" placeholder="电子邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码'}]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="用户密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password2', {
            rules: [{ required: true }]
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认密码" />
          )}
        </FormItem>
        <div>
          <Button type="primary" htmlType="submit" className="signup-form-button">
            注册
          </Button>
          <div style={{ float: 'right', lineHeight: '28px' }}>
            我已有账号, <Link to="/login">前往登录</Link>
          </div>
        </div>
      </Form>
    )
  }
}

const WrappedNormalSignForm = Form.create()(NormalSignupForm)

const Signup = (props) => {

  return (
    <div style={{ width: 340, margin: 'auto', marginTop: 150 }}>
      <WrappedNormalSignForm />
    </div>
  )
}

export default Signup
