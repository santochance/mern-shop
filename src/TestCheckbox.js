import React from 'react'

export default function CheckList(props) {
  function handleChange(changedItem) {
    // item.checked = !item.checked
    items.map(item =>
      item === changedItem
        ? {...item, checked: !item.checked}
        : item
    )
  }

  const items = [true, false, false, true].map((v, i) =>
    ({
      id: i,
      checked: v,
      label: `Item ${i}`
    })
  )

  const listItems = items.map(item => (
    <div>
      <input type="checkbox" value={item.checked} onChange={handleChange(item)} />{item.label} <span>{item.checked ? 'true' : 'false'}</span>
    </div>
  ))

  window.items = items

  return (
    <div>{listItems}</div>
  )
}
