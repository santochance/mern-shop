import React from 'react'

import {
  Modal
} from 'react-bootstrap'

import { form2json } from './helper/form2json.js'
import FormModal from './FormModal.js'

class UserCrud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // editing: false,
      // editedEntry: undefined,
      // form: null,
      // removing: false,
      // removedEntry: undefined,
      // errorMsg: '',
      //
      baseURI: '/users',
      entries: [],

      showModal: false,
      modalMode: '',
      modalTitle: '',
      editedEntry: undefined,
    }
  }

  componentDidMount() {
    this.list()
  }

  list() {
    fetch(this.state.baseURI)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .then(entries => this.setState({...this.state, entries}))
      .catch(console.error)
  }

  add({ entry }) {

    fetch(this.state.baseURI, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(entry)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .then(() => this.list())
      .catch(console.error)
  }

  update({ entry, id }) {

    id = id || entry._id

    fetch(this.state.baseURI + '/' + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(entry)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .then(() => this.list())
      .catch(console.error)
  }

  remove({ entry, id }) {
    id = id || entry._id

    fetch(this.state.baseURI + '/' + id, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.json()
        }
      })
      .then(() => this.list())
      .catch(console.error)
  }

  openModal ({ mode, entry, title }) {
    entry = entry || {
      username: 'test' + Date.now(),
      password: 'password',
      email: 'email@xx.com'
    }
    this.setState({
      showModal: true,
      modalMode: mode,
      modalTitle: title,
      editedEntry: {...entry},
    })
  }

  closeModal () {
    this.setState({
      showModal: false,
      modalMode: '',
      modalTitle: '',
      editedEntry: undefined,
    })
  }

  saveModal ({ mode, entry }) {
    this[mode]({ entry })
    this.closeModal()
  }

  confirmRemove(entry) {
    this.setState({
      ...this.state,
      removing: true,
      removedItem: entry,
      veriCode: '123456',
    })
  }

  verififyRemove(actual) {
    let { veriCode, removedItem } = this.state
    if (actual === veriCode) {
      this.remove(removedItem._id)
      this.closeEdit()
    } else {
      // 确认码不正确
      this.setState({
        ...this.state,
        errorMsg: '确认码不正确！'
      })
    }
  }

  onChange(e) {
    let { name, value } = e.target
    let { editedEntry } = this.state
    this.setState({
      editedEntry: {...editedEntry, [name]: value}
    })
  }

  render() {
    let {
      entries,
      showModal,
      modalMode,
      modalTitle,
      editedEntry,
    } = this.state

    // let inputVeriCode
    return (
      <div className="user-crud">
        <div className="operation">
          <button className="btn btn-primary"
            onClick={() => this.openModal({
              mode: 'add',
              title: '添加用户'
            })}>Add</button>
        </div>
        <div className="data">
          <div>Add to {entries.length} entries</div>
          <ol>
            {entries.map((entry, i) => (
              <li key={i}>
                <pre>{JSON.stringify(entry, ['_id', 'username', 'email'], 2)}</pre>
                <div>
                  <button className="btn btn-success"
                    onClick={() => this.openModal({
                      mode: 'update',
                      title: '修改用户',
                      entry: entry,
                    })}>修改</button>
                  <button className="btn btn-danger"
                    onClick={() => this.openModal({
                      mode: 'remove',
                      title: '删除用户',
                      entry: entry,
                    })}>删除</button>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <FormModal
          showModal={showModal}
          modalMode={modalMode}
          modalTitle={modalTitle}
          formValues={editedEntry}
          onSubmitForm={(payload) => this.saveModal(payload)}
          onCancelForm={() => this.closeModal()}
          onChange={(e) => this.onChange(e)}
        />
      </div>
    )
  }
}

export default UserCrud
