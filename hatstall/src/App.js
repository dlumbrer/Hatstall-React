import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';

import { NavLink, BrowserRouter, Route, Link } from 'react-router-dom'

// Custom components
import { SearchProfiles } from './custom_components/SearchProfiles'
import { Main } from './custom_components/Main'
import { Organizations } from './custom_components/Organizations'
import { About } from './custom_components/About'
import { ProfilesList } from './custom_components/ProfilesList'
import { Profile } from './custom_components/Profile'


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
              <NavItem>
                <NavLink eventKey={1} to="/profiles">
                  Profiles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink eventKey={1} to="/organizations">
                  Organizations
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink eventKey={1} to="/about">
                  About
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>

          <Route exact path="/profiles" component={SearchProfiles} />
          <Route path="/profiles/list" component={ProfilesList} />
          <Route path="/profile/:profileId" component={Profile}/>
          <Route path="/organizations" component={Organizations} />
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter >
    );
  }
}



export default App;
