import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';

import { NavLink, BrowserRouter, Route, Link } from 'react-router-dom'

// Custom components
import SearchProfiles from './custom_components/SearchProfiles'
import { Main } from './custom_components/Main'
import Organizations from './custom_components/Organizations'
import { About } from './custom_components/About'
import Profile from './custom_components/Profile_new'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Hatstall</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="/profiles">
                Profiles
                </NavItem>
              <NavItem eventKey={1} href="/organizations">
                Organizations
                </NavItem>
              <NavItem eventKey={1} href="/about">
                About
                </NavItem>
            </Nav>
          </Navbar>

          <Route exact path="/profiles" component={SearchProfiles} />
          <Route path="/profile/:profileId" component={Profile} />
          <Route path="/organizations" component={Organizations} />
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter >
    );
  }
}



export default App;
