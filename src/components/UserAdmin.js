import React from 'react'

import {
  Table
} from 'antd'

// import 'antd/dist/antd.css'

import '../UserAdmin.css'

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true,
    width: '15%',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '25%'
  },
  {
    title: '注册日期',
    dataIndex: 'created',
    width: '20%',
  }
]

class UserAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.loadData(url)
  }

  loadData(url) {
    fecth(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className="user-admin">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default UserAdmin;
