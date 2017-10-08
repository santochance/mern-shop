import React from 'react'

import { Form, Input, Button, Icon } from 'antd'
import UploadAvatar from '../components/UploadAvatar.js'

const FormItem = Form.Item

class EditUserForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form className="user-editForm">
        <FormItem
          labelCol={span: 3}
          wrapperCol={span: 3}>
          {getFieldDecorator('avatar'), {
            rules: [
              { type: 'file' }
            ]
          }}(
            <Input />
          )
        </FormItem>
        <FormItem>
          {getFieldDecorator('username'), {

          }}(
            <Input placeholder="用户名" />
          )
        </FormItem>
        <FormItem>
          {getFieldDecorator('email'), {
            rules: [
              { type: 'email',  message: '不是有效格式的邮箱！'},
              { required: true, message: '请输入邮箱！'}
            ]
          }}(
            <Input />
          )
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone'), {
            rules: [{ type: 'tel' }]
          }}(
            <Input placeholder="手机" />
          )
        </FormItem>
        <FormItem>
          {getFieldDecorator('sex'), {
            rules:
          }}(
            <Input placeholder="性别" />
          )
        </FormItem>
      </Form>
    )
  }
}
