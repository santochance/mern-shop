import React from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Modal, Button, Icon } from 'antd'
const FormItem = Form.Item

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    let {
      modalMode,
      showModal,
      modalTitle,
      onSubmitForm,
      onCancelForm,
      formValues,
      confirmLoading,
    } = this.props

    let initialFormValues
    if (!formValues) {
      initialFormValues = {}
    } else if (Array.isArray(formValues)) {
      if (formValues.length === 1) {
        initialFormValues = formValues[0]
      } else {
        initialFormValues = {}
        modalTitle = `批量${modalTitle} ${formValues.length}个`
      }
    } else {
      initialFormValues = formValues
    }

    if (modalMode === 'remove') {

    }

    return (
      <Modal
        visible={showModal}
        title={modalTitle}
        onOk={() => onSubmitForm(this.formRef.props.form.getFieldsValue())}
        onCancel={onCancelForm}
        confirmLoading={confirmLoading}
      >
        <WrappedEditedForm wrappedComponentRef={(inst) => (this.formRef = inst)}
          initialFormValues={initialFormValues} />
      </Modal>
    )
  }
}

class EditedForm extends React.Component {

  render () {
    const { getFieldDecorator } = this.props.form
    const { initialFormValues } = this.props

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: initialFormValues.username,
            rules: [{ required: true, message: '请输入用户名！' }]
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            initialValue: initialFormValues.email,
            rules: [{ required: true, message: '请输入电子邮箱！' }]
          })(
            <Input type="email" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="电子邮箱" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: initialFormValues.password,
            rules: [{ required: true, message: '请输入密码！' }]
          })(
            <Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码" />
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedEditedForm = Form.create()(EditedForm)

FormModal.propTypes = {
  modalMode: PropTypes.string,
  showModal: PropTypes.bool,
  modalTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  onSubmitForm: PropTypes.func,
  onCancelForm: PropTypes.func,
  formValues: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])

}

export default FormModal
