import React from 'react'

import { Modal } from 'react-bootstrap'

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {
      showModal,
      modalMode,
      modalTitle,
      formConfigs,
      formValues,
      onSubmitForm,
      onCancelForm,
      onChange,
    } = this.props

    return (
      <Modal
        show={showModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode !== 'remove' ? (
            <EditedForm
              formConfigs={formConfigs}
              formValues={formValues}
              onChange={onChange}
            />
          ) : (
            <ConfirmRemove />
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default"
            onClick={onCancelForm}>取消</button>
          <button className="btn btn-primary"
            onClick={() => onSubmitForm({
              mode: modalMode,
              entry: formValues,
            })}>确定</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

FormModal.propTypes = {
  showModal: React.PropTypes.bool,
  modalMode: React.PropTypes.string,
  modalTitle: React.PropTypes.string,
  formConfigs: React.PropTypes.arrayOf(React.PropTypes.shape),
  formValues: React.PropTypes.objectOf(React.PropTypes.shape),
  onSubmitForm: React.PropTypes.func,
  onCancelForm: React.PropTypes.func,
  onChange: React.PropTypes.func,
}

const EditedForm = (props) => {
  let {
    formValues: entry = {},
    onChange,
  } = props

  return (
    <form>
      <div className="form-group">
        <label htmlFor="username" className="control-label">用户名：</label>
        <input type="text" name="username" id="username" value={entry.username}
          onChange={onChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="email" className="control-label">邮箱：</label>
        <input type="email" name="email" id="email" value={entry.email}
          onChange={onChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="control-label">密码：</label>
        <input type="password" name="password" id="password" value={entry.password}
          onChange={onChange}/>
      </div>
      {entry._id && (
        <input type="hidden" name="_id" id="_id" value={entry._id}
          onChange={onChange}/>
      )}
    </form>
  )
}

const ConfirmRemove = () => {

  return (
    <div>确定要删除吗？</div>
  )
  // return (
  //   <div>
  //     <p>
  //       你正在删除下面数据：
  //       <pre>{JSON.stringify(removedItem, null, 2)}</pre>
  //       注意！删除后数据将不可恢复。
  //     </p>
  //     <p>
  //       如果你知道自己正在做什么，并且依然坚持要执行删除操作，请输入以下确认码（字母区分大小写），然后点击“删除”按钮。
  //     </p>
  //     <p>
  //       确认码：{this.state.veriCode}
  //     </p>
  //     <p>
  //       输入确认码：<input type="text" value={inputVeriCode} onChange={(e) => (inputVeriCode = e.target.value)}/>
  //     </p>
  //     {errorMsg && (
  //       <div className="bg-warning">确认码输入错误！</div>
  //     )}
  //   </div>
  // )
}

export default FormModal
