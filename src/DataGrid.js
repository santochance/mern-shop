import React from 'react'
import _ from 'lodash'

import { random, randomDate, randomPharse } from './helper/randoms.js'
import splitArray from './helper/splitArray.js'
import genIndexDisplay from './helper/genIndexDisplayer.js'

import Page from './helper/page.js'

import './DataGrid.css'

import 'react-virtualized/styles.css'
import { Column, Table } from 'react-virtualized'

class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        size: 5,
        index: 0
      }
    }
  }

  componentDidMount() {
    let size = 5
    Object.assign(this, {
      page: new Page(this.genFakeData(100), 5)
    })

    // desc数据
    let desc = ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary']
    desc = desc.map(d => (
      {
        label: _.startCase(d),
        key: _.camelCase(d),
        className: _.snakeCase(d),
      }
    ))

    this.toggleSorting(desc[0].key)
    // 调用一次setState触发render()
    this.setState({ ...this.state, desc })
  }

  // loadData
  loadData(url, query) {
    if (query) {
      let querySegs = []
      if (Array.isArray(query)) {
        querySegs = query
      } else if ({}.toString.call(query).slice(8, -1) === 'Object') {
        querySegs = Object.entries(query)
          .map(([key, value]) => `${key}=${value}`)
      } else {
        querySegs = Array.from(arguments).slice(1)
      }

      let queryStr = querySegs.join('&')
      queryStr && (
        url += '?' + encodeURI(queryStr)
      )
    }

    return new Promise((resolve, reject) =>
      fetch(url)
        .then(res => {
          if (res.ok) {
            res.json().then(data => resolve(data))
          } else {
            reject(res)
          }
        })
        .catch(err => reject(err))
    )
  }

  genFakeData(num = 10) {
    // fakeData
    /*
    var schema = {
      name: String,
      position: String,
      office: String,
      age: String,
      startDate: Number,
      salary: Number,
    }
     */
    return Array(num).fill().map(value => (
      {
        name: randomPharse(2),
        position: randomPharse(1, 3),
        office: randomPharse(1, 2),
        age: random(20, 70),
        startDate: new Date(randomDate('2008-01-01', '2017-07-07')).toISOString().slice(0, 10),
        salary: random(5000, 50000),
      }
    ))
  }

  switchSize(e) {
    this.page.switchSize(e.target.value)
    // 触发render()
    this.setState({...this.state})
  }

  toggleSorting(key) {
    let page = this.page
    let { key: prevKey, type: prevType } = page.sort || {}
    // 如果sort使用的key改变了，不再使用上一次的sort.type状态
    if (key !== prevKey) { prevType = null }
    // 先升序后降序，依次切换
    let type = prevType === 'asc' ? 'desc' : 'asc'

    page.sortBy({
      key,
      type,
    })
    this.setState({...this.state})
  }

  render() {
    let { page } = this
    if (!page) return null

    let {
      data,
      index,
      indexKeys,
    } = page

    let { desc } = this.state

    function sortingIcon (props) {
      let { key, type } = page.sort || {}
      let currKey = props.sortingKey

      if (currKey === key) {
        return (
          <div>{type}</div>
        )
      } else {
        return null
      }
    }

    return (
      <div className="data-grid">

        <div className="gridview-wrapper">
          <div className="row">
            <div className="col-sm-6">
              <div className="btn-group">
                <button className="btn btn-primary add-btn">Add</button>
                <button className="btn btn-info edit-btn">Edit</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="pickSize">
                 Show
                <select name="size" id="pickSize" onChange={(e) => this.switchSize(e)}>
                  {['5', '10', '20', '25', '50'].map((size, i) => (
                    <option key={i} value={size}>{size}</option>
                  ))}
                </select>
                entries
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Grid
                columns={desc}
                entries={data}
                headerRowRenderer={DescRow}
                rowRenderer={CellRow}
                sort={(key) => this.toggleSorting(key)}
                sortIconRenderer={sortingIcon}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              Showing...
            </div>
            <div className="col-sm-9">
              <Pagination page={page} />
            </div>
          </div>
        </div>

        <div>
          <TestTable list={data} />
        </div>
      </div>
    )
  }
}

const GridHeader = (props) => {

  return (
    <div>Grid Header</div>
  )
}

const GridFooter = (props) => {

  return (
    <div>Grid Footer</div>
  )
}

const Grid = (props) => {
  // {
  //   columns: Array,
  //   entries: Array,
  //   rowRenderer: Function Component,
  //   headerRowRenderer: Function Component,
  //   sort: Function,
  // }

  let { headerRowRenderer, rowRenderer, entries } = props

  return React.createElement(
    'div',
    { className: 'data-grid-container' },
    [
      headerRowRenderer({...props}),
      ...entries.map((entry, i) =>
        (rowRenderer({entry, ...props})))
    ]
  )
}

const DescRow = (props) => {
  let {
    columns: desc,
    sort: onToggleSorting,
    sortIconRenderer: RenderSortingIcon
  } = props

  return (
    <div className="tr desc-row">
      {desc.map((d, i) => (
        <div key={i}
          className={'th desc-' + d.className}
          onClick={() => onToggleSorting(d.key)}
        >
          {d.label}
          <RenderSortingIcon sortingKey={d.key} />
        </div>
      ))}
    </div>
  )
}

const CellRow = (props) => {
  let {
    entry: data
  } = props

  return (
    <div className="tr item-row">
      <div className={'td cell-name'}>{data.name}</div>
      <div className={'td cell-position'}>{data.position}</div>
      <div className={'td cell-office'}>{data.office}</div>
      <div className="td cell-age">{data.age}</div>
      <div className={'td cell-startDate'}>{data.startDate}</div>
      <div className={'td cell-salary'}>￥{data.salary}</div>
    </div>
  )
}

const Pagination = (props) => {
  let { page } = props
  let { index, indexKeys } = page
  let prevLabel = '\u00AB'
  let nextLabel = '\u00BB'

  return (
    <div className="Page navigation">
      <ul className="pagination">
        <li className={indexKeys.prev || 'disabled'}>
          <a href={'#'} aria-label="Previous" onClick={() => page.goto(index - 1)}>
            <span aria-hidden="true">{prevLabel}</span>
          </a>
        </li>
        {indexKeys.all.slice(1, -1).map((key, i) =>
          (key === '...') ? (
            <span key={i} style={{float: 'left', padding: '6px 12px'}}>{key}</span>
          ) : (
            <li key={i} className={typeof key === 'string' && 'active'}
              onClick={() => page.goto(parseInt(key) - 1)}>
              <a href={'#'}>{key}</a>
            </li>
          )
        )}
        <li className={indexKeys.next || 'disabled'}
          onClick={() => page.goto(index + 1)}>
          <a href={'#'} aria-label="Next">
            <span aria-hidden="true">{nextLabel}</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

const TestTable = (props) => {
  let { list } = props

  return (
    <Table
      width={990}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={list.length}
      rowGetter={({ index }) => list[index]}
    >
      <Column
        label="Name"
        dataKey="name"
        width={160}
      />
      <Column
        label="Position"
        dataKey="position"
        width={200}
      />
      <Column
        label="Office"
        dataKey="office"
        width={140}
      />
      <Column
        label="Age"
        dataKey="age"
        width={60}
      />
      <Column
        label="Start Date"
        dataKey="startDate"
        width={120}
      />
      <Column
        label="Salary"
        dataKey="salary"
        width={100}
      />
    </Table>
  )
}

export default DataGrid
