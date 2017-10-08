import React from 'react'

import {
  Table, Button, Icon,
} from 'antd'

import { FormModal } from '../components'

import _ from 'lodash'
import searchWith from '../helper/search.js'

import 'antd/dist/antd.css'

import '../UserAdmin.css'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: '15%',
    filters: [
      {
        text: '测试用户', value: 'test'
      }
    ],
    filteredValue: ['test'],
    onFilter: (value, record) => record.username.search(/^test/) >= 0,
    sorter: (a, b) => a.username - b.username,
    // sortOrder: 'ascend',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '25%',
    filters: [
      {
        text: 'qq.com', value: 'qq.com'
      }
    ],
    onFilter: (value, record) => record.email.search(/qq\.com$/) >= 0
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: '10%',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '注册日期',
    dataIndex: 'created',
    width: '20%',
    sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
    // sortOrder: 'ascend',
  }
]

class UserAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
      rawData: undefined,
      pagination: {},
      rowSelection: {
        onChange: (...args) => this.handleTableSelectionChange(...args)
      },
      showRowSelection: false,
      selectedRows: [],

      showModal: false,
      modalMode: '',
      modalTitle: '',
      editedEntry: undefined,
    }
    this.debouncedSearch = _.debounce(this.debouncedSearch.bind(this), 200)
  }

  componentDidMount() {
    this.loadData()
  }

  handleTableChange(pagination, filters, sorter) {
    // this.loadData()
  }

  debouncedSearch(text) {
    console.log('changed value:', text)

    let { data, rawData } = this.state
    if (!rawData) {
      rawData = [...data]
    }
    data = searchWith(rawData, { text: text })

    console.log('rawData:', rawData)
    console.log('data:', data)

    this.setState({ data, rawData })
  }

  loadData() {
    this.setState({ loading: true })
    fetch('/users')
      .then(res => res.json())
      .then(data => this.setState({
        loading: false,
        data: data.map(d => Object.assign(
          { age: _.random(18, 50) },
          d,
        )),
        rawData: undefined,
      }))
      .catch(console.error)
  }

  openModal({ mode, entry, title }) {
    // 如果entry是来自selectedRows, 即使只选中一项，也会是array
    entry = entry || {
      username: 'test' + Date.now(),
      password: 'password',
      email: 'email@xx.com'
    }

    this.setState({
      showModal: true,
      modalMode: mode,
      modalTitle: title,
      editedEntry: entry
    })
  }

  saveModal({ mode, entry, newEntry }) {
    let entries = Array.isArray(entry) ? entry : [entry]
    let action = mode + 'User'
    Promise.all([entries.map(e =>
      this[action]({ entry: e, newEntry })
    )])
      .then(() => this.loadData())
      .then(() => this.closeModal())

    /*
    this[mode + 'User']({ entry })
      .then(() => this.loadData())
      .then(() => this.closeModal())
     */
  }

  closeModal() {
    this.setState({
      showModal: false,
      modalMode: '',
      modalTitle: '',
      editedEntry: undefined,
      confirmLoading: false,
    })
  }

  addUser({ newEntry }) {
    return this.sendData({
      baseURI: '/users',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newEntry),
    })
  }

  updateUser({ newEntry, entry }) {
    return this.sendData({
      baseURI: '/users' + '/' + entry._id,
      method: 'PUT',
      header: {'Content-Type': 'application/json'},
      body: JSON.stringify(newEntry),
    })
  }

  removeUser({ entry }) {
    return this.sendData({
      baseURI: '/users' + '/' + entry._id,
      method: 'DELETE',
    })
  }

  sendData({ baseURI, method, headers, body }) {
    return fetch(baseURI, { method, headers, body, })
      .then(res => {
        if (res.ok) return res.json()
        else throw res.json()
      })
      .catch(console.error)
  }

  listUser() {

  }

  toggleRowSelection(toggle) {
    let rowSelection = {...this.state.rowSelection}
    toggle
      ? delete rowSelection.selectedRowKeys
      : rowSelection.selectedRowKeys = []
    // this.setState({
    //   showRowSelection: toggle,
    //   rowSelection,
    // })
    this.setState({ rowSelection }, () => this.setState({ showRowSelection: toggle, selectedRows: [] }))
  }

  handleTableSelectionChange(selectedRowKeys, selectedRows) {
    console.log('selectedRows:', selectedRows)
    this.setState({ selectedRows })
  }

  render() {
    let {
      data,
      showModal,
      modalMode,
      modalTitle,
      editedEntry,
      confirmLoading,
      showRowSelection,
      rowSelection,
      selectedRows,
    } = this.state

    return (
      <div className="user-admin">
        <div className="search-bar">
          <form action="">
            <div className="form-group">
              <label className="control-group" htmlFor="search">Search:</label>
              <input type="text" name="search" id="search"
                onChange={(e) => this.debouncedSearch(e.target.value)} />
            </div>
          </form>
        </div>
        <div className="operation">
          {!showRowSelection ? (
            <div>
              <Button className="create-btn" key="add" size={'large'} onClick={() => this.openModal({ mode: 'add', title: '创建用户' })}><Icon type="plus-circle-o" />创建用户</Button>
              <Button className="batchEdit-btn" key="batchEdit" size={'large'} onClick={() => this.toggleRowSelection(true)}><Icon type="check-circle-o" />批量编辑</Button>
            </div>
          ) : (
            <div>
              <Button size={'large'} onClick={() => this.toggleRowSelection(false)}><Icon type="arrow-left" />结束批量编辑</Button>
              <span>共选择 {selectedRows.length} 项</span>
              <Button type="primary" key="update" size={'large'} onClick={() => this.openModal({ mode: 'update', title: '修改用户', entry: selectedRows })}><Icon type="edit" />修改</Button>
              <Button type="primary" key="remove" size={'large'} onClick={() => this.openModal({ mode: 'remove', title: '删除用户', entry: selectedRows })}><Icon type="delete" />删除</Button>
            </div>
          )}
        </div>
        <div>
          {data.length} entries showed
        </div>
        <Table dataSource={data} columns={columns} rowSelection={showRowSelection ? rowSelection : null} />
        {showModal && <FormModal
          showModal={showModal}
          modalMode={modalMode}
          modalTitle={modalTitle}
          formValues={editedEntry}
          onSubmitForm={(values) => this.saveModal({
            mode: modalMode,
            entry: editedEntry,
            newEntry: values,
          })}
          onCancelForm={() => this.closeModal()}
          confirmLoading={confirmLoading}
        />}
      </div>
    );
  }
}

export default UserAdmin;
