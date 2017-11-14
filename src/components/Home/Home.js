/* eslint no-unused-vars: 0 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar, Nav, NavItem,
  NavDropdown, MenuItem,
  Button, FormGroup, FormControl,
  Grid, Row, Col,
  Carousel, Thumbnail,
  Panel, Form,
} from 'react-bootstrap'

import CardGrid from './CardGrid'

const Home = ({ data, app }) => {

  return (
    <div className="home">
      <main className="wrapper pt-20">
        <ControlledCarousel slides={data.banner} />
        {data.floors.map((floor, idx) => (
          <CardGrid key={idx} header={floor.title} items={floor.items} />
        ))}
      </main>
    </div>
  )
}

//
// ControlledCarousel
//
class ControlledCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 1190,
      height: 300,
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selectedIndex, e) {
    // alert('selected=' + selectedIndex + ', direction=' + e.direction);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    let { width, height } = this.state
    let { slides } = this.props
    let srcWidth = 1500
    return (
      <Carousel interval={2500} onSelect={this.handleSelect} style={{marginBottom: 32, width}}>
        {slides.map((slide, i) => (
          <Carousel.Item key={i} style={{ overflow: 'hidden' }}>
            <img width={1500} height={300} src={slide} alt="" style={{ position: 'relative', maxWidth: 'none', minWidth: '100%', left: (width - srcWidth) < 0 ? (width - srcWidth) / 2 : 0 }}/>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

export default Home
