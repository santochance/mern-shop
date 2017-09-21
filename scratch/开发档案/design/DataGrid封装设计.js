const HeaderRow = (props) => {

}

const Row = (props) => {

  return (
    <tr>
      <td>
        <img src={user.avatar} alt=""/>
      </td>
      <td></td>
      <td></td>
      <td>
        <input type="radio" name="" id=""/>
      </td>
    </tr>
  )
}


cols = [
  {
    label: '头像',
    name: 'avatar',
    width: 300,
  },
  {

  }
]

<HeaderRow cols={cols} />
data.map(entry => (
  <Row user={entry} />
))


<Table
  columns={}
  entries={}
  rowRender={}
  headerRowRender={}
  sort={}
/>


<Table>
  <HeaderRow cols={cols}></HeaderRow>
  <Row />
</Table>

<div className="datagird">
  <GridHeader />
  <Grid
    columns={cols}
    entries={data}
    limit={}
    rowRenderer={CellRow}
    headerRowRenderer={DescRow} />
  <GridFooter />
</div>


const HeaderRowRender = (props) {

}

function sort({sortBy, sortDirection}) {

}


// headerRowRenderer Function ({ columns: array, sort: function, sortBy: string, sortDirection: sortDirection?? })
const DescRow = (props) => {
  let {
    columns
    sort,
    sortBy,
    sortDirection
  } = props

  // props传入的sortBy, sortDirection是当前的

  // sort direction的处理逻辑放在这里
  let direction = //...


  return (
    columns.map((col, i) => (
      <div key={i}
        onClick={() => sort({sortBy, direction})}
      >{col.label}</div>
    ))
  )
}

// rowRender Function ({ entry })
const CellRow = (props) => {

}


class Grid extends React.Component {
  constructor(props) {
    super(props);

    let {
      sortBy = props.columns[0].name,
      sortDirection = 'asc'
    } = props

    this.state = {
      sortBy,
      sortDirection,
    }
  }

  render() {
    let { rowRenderer, headerRowRenderer } = this.props

    return React.createElement(
      div,
      { className: 'datagrid' },
      [
        headerRowRenderer({columns, sort, sortBy, sortDirection}),
        ...entries.map((entry, i) => (
          rowRenderer({ entry })
        ))
      ]
    )
  }
}
