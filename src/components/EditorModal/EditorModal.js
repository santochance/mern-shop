import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'

// props = {
//  show,
//  title,
//  footer,
//  form,
//  entry,
//  onSubmit,
//  onCancel,
//  confirmLoading,
// }

// 注意EditorModal内的表单数据由Modal管理
class EditorModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 使用props传入的entry，默认值为空对象
      editedEntry: this.props.entry || {}
    }
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange(e, fieldKey) {
    // 改变Field的值
    // 注意使用editedEntry的副本
    this.setState({
      editedEntry: Object.assign({}, this.state.editedEntry, {
        [fieldKey]: e.target.value
      })
    })
  }

  render() {
    const {
      show,
      title,
      footer,
      onSubmit,
      onCancel,
    } = this.props
    let {
      editedEntry
    } = this.state

    return (
      <Modal
        show={show}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditedForm entry={editedEntry} onFieldChange={this.onFieldChange} />
        </Modal.Body>
        <Modal.Footer>
          {footer || [
            <button className="btn btn-default"
              onClick={onCancel}>取消</button>,
            <button className="btn btn-primary"
              onClick={(e) => onCancel(e)}>确定</button>
          ]}
        </Modal.Footer>
      </Modal>
    )
  }
}

EditorModal.propType = {
  show: PropTypes.bool.isRequired,
  entry: PropTypes.object.isRequired,
}

const EditedForm = ({ entry, onFieldChange }) => {
  // 姓名
  // 地址
  // 联系电话

  // entry = {
  //   name: 'Vincent',
  //   phone: 'hello'
  // }
  return (
    <div style={{
      margin: '16px 0'
    }}>
      <Form horizontal>
        <FormGroup controlId="name">
          <Col componentClass={ControlLabel} sm={3}>姓名</Col>
          <Col sm={9}>
            <FormControl value={entry['name']} onChange={(e) => onFieldChange(e, 'name')}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="address">
          <Col componentClass={ControlLabel} sm={3}>地址</Col>
          <Col sm={9}>
            <FormControl value={entry['address']} onChange={(e) => onFieldChange(e, 'address')}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="phone">
          <Col componentClass={ControlLabel} sm={3}>联系电话</Col>
          <Col sm={9}>
            <FormControl value={entry['phone']} onChange={(e) => onFieldChange(e, 'phone')}/>
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
}

export { EditorModal as default, EditedForm }
