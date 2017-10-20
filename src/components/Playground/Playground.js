import React from 'react'
import { Button, FormGroup, FormControl, ControlLabel, Form, Col } from 'react-bootstrap'

import EditorModal, { EditedForm } from '../EditorModal'
import ProductNew from '../../ProductNew.js'

const entry = {
  name: 'Vincent',
  address: '广东省 江门市 ...',
  phone: '138****7697',
}

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={{ width: 500 }}>
        <ProductNew />
        <EditedForm entry={entry} />
      </div>
    )
  }
}

export default Playground
