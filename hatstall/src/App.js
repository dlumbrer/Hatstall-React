import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand, NavDropdown, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'

function Profiles() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#home">Hatstall</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem>
                <NavLink eventKey={1} to="/profiles">
                  Profiles
              </NavLink>
              </NavItem>
              <NavItem eventKey={2} href="#/Organizations">
                Organizations
              </NavItem>
              <NavItem eventKey={2} href="#/About">
                About
              </NavItem>
            </Nav>
          </Navbar>

          <Route path="/profiles" component={Profiles} />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
          </a>
          </header>

        </div>
      </BrowserRouter >
    );
  }
}



export default App;
