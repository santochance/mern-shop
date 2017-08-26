/*
  // 方案一：
  // 获取渲染尺寸
  // 获取限制尺寸
  // 比较两者
    // rendered > limited
      ? overflow: hidden, add toggle_btn
      : null(overflow: visible)

// 方案二：
  // 获取scrollBox
  // 获取paddingBox
  // 比较两者
    // scrollBox > paddingBox
      ...（同上）

*/

import React from 'react'

const Filters = () => (
  <div className="box">
    <div className="wrapper">
      <ul className="content">
        {Array(20).fill().map((v, i) =>
          <li key={i}>{`Item ${i}`}</li>
        )}
      </ul>
    </div>
  </div>
)

export default Filters
