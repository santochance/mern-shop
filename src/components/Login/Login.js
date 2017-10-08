import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Avatar } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="用户密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我的登录状态</Checkbox>
          )}
          <a style={{ float: 'right' }} className="login-form-forgot" href="">忘记密码</a>
        </FormItem>
        <div style={{ marginTop: '-20px' }}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <div style={{ float: 'right', lineHeight: '28px' }}>
            还没有账号？<a href="">现在注册！</a>
          </div>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const Login = (props) => {

  return (
    <div style={{ width: 360, margin: 'auto', marginTop: 150, }}>
      <WrappedNormalLoginForm />
    </div>
  )
}

export default Login
