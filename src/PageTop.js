import React from 'react'

import { Link } from 'react-router-dom'

import {
  Navbar, Nav, NavItem,
  FormGroup, FormControl, Button
} from 'react-bootstrap'

import './pagetop.css'

const PageTop = (props) => {
  return (
    <header className="pagetop">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Brand</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <Navbar.Form className="pagetop-search-bar">
            <FormGroup>
              <FormControl type="text" name="search" placeholder="Search"/>
            </FormGroup>
            {' '}
            <Link to="/search">
              <Button type="submit" onClick={props.onSearch}>Search</Button>
            </Link>
          </Navbar.Form>
        </Nav>
      </Navbar>
    </header>
  )
}

export default PageTop
