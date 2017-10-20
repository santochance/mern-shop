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

// import PageTop from './PageTop.js'

const Home = () => (
  <div>
    {/*
    <PageTop />
    */}
    <main>
      {/*
      <Form style={{
        width: 300,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <FormGroup>
          <FormControl type="text" name="search" />
        </FormGroup>
        <Button>搜&nbsp;索</Button>
      </Form>
      */}
      <form className="search-bar" action="" style={{
        width: 400
      }}>
        <input type="text"/>
        <button>搜&nbsp;索</button>
      </form>
      <ControlledCarousel />
      <ProductGallery />
    </main>
    <Footer />
  </div>
)

// const Header = (props) => {
//   return (
//     <header>
//       { navbarInstance }
//     </header>
//   )
// }

const Footer = () => (
  <footer>
    This is placeholder for Footer.
  </footer>
)

//
// Navbar
//

function handleClick(e) {
  console.log('search btn is clicked.')
}

function search(e) {
  // debugger
  // e.preventDefault()

  const term = encodeURIComponent(document.getElementsByName('search')[0].value)

  console.log('term:', term)
  fetch(`/products/${term}/search`).then(res => {
    if (res.ok) {
      res.json().then(console.log)
    } else {
      res.json().then(console.error)
    }
  }).catch(console.error)
}

const navbarInstance = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Brand</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text" name="search" placeholder="Search" onChange={null}/>
        </FormGroup>
        {' '}
        <Link to="/search">
          <Button type="submit" onClick={handleClick}>Search</Button>
        </Link>
      </Navbar.Form>
    </Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="/signin">登录</NavItem>
      <NavItem eventKey={2} href="/signup">注册</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

//
// ControlledCarousel
//
class ControlledCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      direction: null,
      width: 1190,
      height: 360,
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
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect} style={{marginBottom: 32}}>
        {slides.map((slide, i) => (
          <Carousel.Item key={i} style={{...{width, height}}}>
            <img width={width} height={height} src={slide.src} alt={slide.alt}/>
            <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

const slides = Array.from({length: 3}).map((s, i) => (
  {
    src: require(`./assets/p_1280x_800 (${i + 1}).jpg`),
    alt: `product ${i + 1}`,
    title: 'Title for slide',
    description: 'Description for slide',
    width: 960,
    height: 600
  }
))

//
// Gallery
//

const titleBar = (
  <div className="clearfix">
    <h3 style={{
      fontSize: 30,
      lineHeight: '1em',
      paddingLeft: '0.48em',
      borderLeft: '0.2em solid',
      color: 'blue' }}>
      Panel title
      <a className="fr" style={{fontSize: 16}}>查看更多...</a>
    </h3>
  </div>
)
const ProductGallery = () => (
  <Panel className="product-gallery" header={titleBar}>
    <Grid className="product-grid">
      <Row className="product-row">
        {products.map((p, i) => (
          <Col xs={3} key={i} className="product-col">
            <Thumbnail src={p.thumbnail}>
              <h3>{p.title + ' ' + i}</h3>
              <p>{p.description}</p>
              <p>
                {/*
                <Button bsStyle="primary">Button</Button>
                */}
                <span>{p.price}</span>
                <Button bsStyle="primary" bsSize="small">Button</Button>
              </p>
            </Thumbnail>
          </Col>
        ))}
      </Row>
    </Grid>
  </Panel>

)

const products = Array(8).fill(
  {
    thumbnail: require('./assets/placeholder3_600x600.png'),
    alt: 'alternative text...',
    title: 'Title for product',
    description: 'Description for product',
    price: Math.ceil(Math.random() * 1000)
  }
)

export default Home
