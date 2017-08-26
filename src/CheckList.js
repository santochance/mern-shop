import React from 'react'


class CheckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedStatus = [],
      // Todo: 根据props初始化和动态更新allChecked
      allChecked = false,
      items = [1,2,3,4]
    }
  }



  Heading

  Item  onChange


  checkOne(newValue, index) {
    checkedStatus.splice(index, 1, newValue)
    allChecked = checkedStatus.every(checked => checked)
  }

  checkAll(newValue) {
    checkedStatus = fill(newValue)
  }

  // state变化时，更新input.value
  // input.value变化时，通过event更新state

  // native change，input的value值 已经变化
  // 在onchange事件中修改绑定的数据值

  input

  render() {
    <div>
      <div className="title">
        <input type="checkbox" name="" id="" onChange={checkAll}/>
        CheckList
      </div>
      <ul className="list">
        {items.map((item, i) => (
          <li className="item" key={i}
            onChange={() => checkOne(i)}>Item {i}</li>
          ))}
      </ul>
    </div>
  }
}
