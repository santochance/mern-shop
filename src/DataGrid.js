import React from 'react'

import { random, randomDate, randomPharse } from './helper/randoms.js'
import splitArray from './helper/splitArray.js'
import './DataGrid.css'

class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        size: 5,
        index: 1
      }
    }
  }

  componentDidMount() {
    let { size, index } = this.state.page

    this.setState({
      ...this.state,
      ...this.paginate(this.genFakeDate(100), size, index),
    })
  }

  paginate(data, size, index = 0) {
    if (!size) {}
    let splitedData = splitArray(data, size)

    return {
      rawData: data,
      data: splitedData,
      page: {
        size,
        index,
        total: splitedData.length
      }
    }
  }

  genFakeDate(num = 10) {
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
    let { rawData, page: { index } } = this.state
    let size = e.target.value

    let updates = this.paginate(rawData, size, index)

    this.setState({
      ...this.state,
      ...updates
    })
  }

  render() {
    let { data, page } = this.state
    let { size, index, total } = page

    if (!data) return null

    console.log('page:', page)
    console.log('data:', data)

    return (
      <div className="data-grid">
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
          <div className="col-sm-6"></div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="data-grid-container">
              {data[index].map((item, i) => (
                <div key={i} className="tr data-grid-item">
                  <div className="td item-name">{item.name}</div>
                  <div className="td item-position">{item.position}</div>
                  <div className="td item-office">{item.office}</div>
                  <div className="td item-age">{item.age}</div>
                  <div className="td item-startDate">{item.startDate}</div>
                  <div className="td item-salary">￥{item.salary}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            Showing...
          </div>
          <div className="col-sm-6">
            <div className="pagination">
              <ul>
                {Array(total).fill().map((v, i) => (
                  <li>{i + 1}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DataGrid
