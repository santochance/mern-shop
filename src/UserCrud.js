import React from 'react'

class UserCrud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editedEntry: null,
    }
  }

  openEdit(entry) {
    this.setState({
      ...this.state,
      editing: true,
      editedItem: entry
    })
  }

  closeEdit() {
    this.setState({
      ...this.state,
      editing: false,
      editedItem: null
    })
  }

  saveEdit(entry) {

  }

  render() {
    let { editing, editedItem } = this.state

    <div className="user-crud">
      <div className="operation">
        <button className="btn btn-primary"
          onClick={() => this.openEdit()}>Add</button>
      </div>
      <Modal toggle={editing} entry={editedItem} />
    </div>
  }
}

const Modal = (props) => {
  let { toggle, entry } = props

  if (toggle) {
    return (
      <div>{JSON.stringify(entry, null, 2)}</div>
    )
  } else {
    return null
  }
}

export default UserCrud
