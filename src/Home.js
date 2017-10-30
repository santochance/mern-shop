/* eslint no-unused-vars: 0 */

import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import CardGrid from './components/CardGrid'

import {
  Navbar, Nav, NavItem,
  NavDropdown, MenuItem,
  Button, FormGroup, FormControl,
  Grid, Row, Col,
  Carousel, Thumbnail,
  Panel, Form,
} from 'react-bootstrap'

// import PageTop from './PageTop.js'

// const item = {
//   title: '商品名称',
//   desc: '商品描述...',
//   price: 1999,
//   oldPrice: 2599,
//   sales: 241,
// }

const item = {
  title: '华硕(ASUS) 灵耀S4000UA 14英寸超窄边框超轻薄笔记本电脑(i5-7200U 8G 256GSSD FHD IPS)金属蓝灰',
  desc: '【一款适合务实低调、追求细节品质、乐观生活轻奢人士的轻薄本！】不等11月！华硕爆款每满千减百！指定商品下单立减！款款惊喜》》',
  price: '4799',
  oldPrice: '5599',
  sales: 241,
}

// const slides = Array.from({length: 3}).map((s, i) => (
//   {
//     src: require(`./assets/p_1280x_800 (${i + 1}).jpg`),
//     alt: `product ${i + 1}`,
//     title: 'Title for slide',
//     description: 'Description for slide',
//     width: 960,
//     height: 600
//   }
// ))
//
const Home = ({ data, app }) => {

  return (
    <div>
      {/*
      <PageTop />
      */}
      <main className="wrapper pt-20">
        <ControlledCarousel slides={data.banner} />
        {/*
          <ProductGallery />
        */}
        {data.floors.map((floor, idx) => (
          <CardGrid key={idx} header={floor.title} items={floor.items} />
        ))}
      </main>
      <Footer />
    </div>
  )
}

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
      width: 1190,
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
