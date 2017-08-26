import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import {
  Navbar, Nav, NavItem,
  NavDropdown, MenuItem,
  Button, FormGroup, FormControl,
  Grid, Row, Col,
  Carousel, Thumbnail,
} from 'react-bootstrap'

import PageTop from './PageTop.js'

const Home = () => (
  <div>
    <PageTop />
    <main>
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
      direction: null
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
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        {slides.map((slide, i) => (
          <Carousel.Item key={i}>
            <img width={slide.width} height={slide.height} src={slide.src} alt={slide.alt}/>
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
const ProductGallery = () => (
  <Grid>
    <Row className="product-grid">
      {products.map((p, i) => (
        <Col xs={3} key={i}>
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
