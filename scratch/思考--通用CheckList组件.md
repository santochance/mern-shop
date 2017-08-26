// 调用组件
<CheckList>
  <div>title</div>
  <ul>
    <li></li>
  </ul>
</CheckList>


<CheckList>
  <div>Title</div>
  <ul>
    <li>
      <CheckList checked />
    </li>
    <li>
      <CheckList/>
    </li>
  </ul>

</CheckList>

class CheckList extends React.Component {


  checkeds = []
  // allChecked从props.checked处获取初始值，然后跟随props.checked
  allChecked = false

  // allChecked发生变化时，通知上一级onCheckedChange


  // 父组件的item触发onCheckedChange，调用checkOne handler

  checkOne(item) {
    checked = !item.checked
    allChecked = items.every(item.checked)
  }

  // 或者叫toggle
  checkAll() {
    items.forEach(item => (item.checked = allChecked))

    this.$emit('checked')
  }

  render() {
    let children = this.props.children

    let heading = children[0]
    let list = children[1]
    let items = children[1].querySelectorAll('li')

    div.CheckList
      div.heading
        input:checkbox onChange checkAll
    {list}
        {heading}
        li
          input:checkbox  onChange
          item.innerHTML
      }
  }
}

// 不改写结构，只添加交互功能



