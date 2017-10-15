class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="vc-modal">
        <div className="mask">
          <div className="content">
            <header className="header">Modal Header</header>
            <div className="main">Modal Body</div>
            <footer className="footer">Modal Footer</footer>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Modal />,
  document.getElementById('root')
)
