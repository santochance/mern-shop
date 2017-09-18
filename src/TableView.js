import React from 'react'

import { random, randomDate, randomPharse } from './helper/randoms.js'
import Page from './helper/page.js'

class TabelView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    let desc = ['Name', 'Position', 'Office', 'Age', 'Start date', 'Salary']

    const getFakeData = (num = 10) => {
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
    let data = genFakeData(50)
  }

  render() {
    let data

    return (
      <div className="tableview">
        <header className="tableview-header">
          placeholder for tableview-header
        </header>
        <div className="tableview-body">
          <table>
            {data.map((d, i) => {
              <tr key={i}>
                <GridItem />
              </tr>
            })}
          </table>
        </div>
        <footer className="tableview-footer">
          <Pagination />
        </footer>
      </div>
    )
  }
}


const GridItem = (props) => {
  return (
    <td>
    </td>
  )
}

const Pagination = () => {

}
