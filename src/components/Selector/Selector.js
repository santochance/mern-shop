import React from 'react'

import './Selector.css'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      value: undefined,
      defaultValue: undefined,
      clickedOpt: null,
      mouseoveredOpt: null,
      mouseoutedOpt: null,
    }
  }

  preventE(fn, ...args) {
    let _this = this
    return function(e) {
      console.log('exec in preventE with\nfn:%s\nargs:', fn.name, ...args)
      e.preventDefault()
      e.stopPropagation()
      fn.call(_this, ...args)
    }
  }

  handleOptionClick (e, option) {
    let clickedOpt = option
    let value = option
    this.setState({ clickedOpt, value })
  }

  handleOptionMouseOver (e, option) {
    let mouseoveredOpt = option
    let mouseoutedOpt = null
    this.setState({ mouseoveredOpt, mouseoutedOpt })
  }

  handleOptionMouseOut (e, option) {
    let mouseoutedOpt = option
    let mouseoveredOpt = null
    this.setState({ mouseoveredOpt, mouseoutedOpt })
  }

  editOption (e, option, index) {
    console.log('Edit Option')
  }
  removeOption (e, option, index) {
    console.log('Remove Option')
  }
  addOption(e) {
    console.log('Add Option')
  }

  render() {
    let { children, options } = this.props
    let { clickedOpt, mouseoveredOpt, mouseoutedOpt } = this.state

    // 获取address数据的crud apis
    // const { add, update, remove, open, close, save } = this.props

    return (
      <div className="selector">
        <ul>
          {options.map((opt, idx) => (
            <li key={idx} className={'option-wrapper' + ' ' + (opt === clickedOpt ? 'active' : '')}
              onClick={(e) => this.handleOptionClick(e, opt)}
              onMouseOver={(e) => this.handleOptionMouseOver(e, opt)}
              onMouseOut={(e) => this.handleOptionMouseOut(e, opt)}>
              <div className="option">
                <p>姓名：{opt.name}</p>
                <p>地址：{opt.addr}</p>
                <p>联系电话：{opt.phone}</p>
              </div>
              {/* opt === mouseoveredOpt */true && (<div className="opera">
                <button className="opera-btn" onClick={this.preventE(open, 'update', opt)}>修&nbsp;改</button>
                <button className="opera-btn last" onClick={this.preventE(open, 'remove', opt)}>删&nbsp;除</button>
              </div>)}
            </li>
          ))}
          <li className="option-wrapper"
            onClick={this.preventE(open, 'add')}>
            <div className="add-option">
              <p className="add-text">使用新地址</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

// 修改数据源的API
//
function add(newItem) {
  data.push(newItem)
}

function update(id, updates) {
  // 找出id指定的数据
  let index = data.findIndex(d => d.id === id)
  // 修改数据
  data.splice(index, Object.assign({}, data[index], updates))

  // 方案一：直接修改源数据
  // 方案二：复制一份源数据后修改，然后替换源数据
}

function remove(id) {
  let index = data.findIndex(d => d.id === id)
  data.splice(index, 1)
}

// 操作Modal的API
//
let showModal = false
let editedEntry = null
let loading = false
function open(mode, entry) {
  // 在mode为add时，entry用于传入默认数据
  // 在mode为update时，entry用于传入被修改数据
  showModal = true
  // 使用副本，而不是源数据
  editedEntry = { ...entry }
}

function close() {
  showModal = false
  editedEntry = null
}

function save(mode, entry) {
  // 打开loading动画
  loading = true
  // 调用数据源crud接口
  // 实际情况通常是异步操作
  if (mode === 'add') {
    add(entry)
  } else if (mode === 'update') {
    update(entry.id, entry)
  } else if (mode === 'remove') {
    remove(entry.id)
  } else {
    console.warn('Unknown mode for Modal!')
  }
  setTimeout(() => {
    // 关闭loading动画
    loading = false
    close()
  }, 2000)
}

let data = [
  {
    id: 0,
    name: '1',
    phone: '1',
  },
  {
    id: 1,
    name: '2',
    phone: '2',
  }
]
const crud = { add, update, remove }
const opModal = { open, close, save }

// const printVars = (vars) => {
//   return Object.entries(vars).map(([key, value]) => (
//     <p>{key}: {JSON.stringify(value, null, 2)}</p>))
// }

// const RootComponent = (props) => {
//   return (
//     <div>
//       {printVars({ showModal, editedEntry, loading })}
//       <Selector options={data} {...props} />
//     </div>
//   )
// }

// ReactDOM.render(
//  <RootComponent {...{...crud, ...opModal}} />,
//   document.getElementById('root')
// )
export default Selector
