import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import './Header.css';
import logo from './RestView.png';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default class header extends Component {
  render() {
    return (
      <div className={'headerContainer'}>
        <div className={'navbarWrapper'}>
          <Navbar className={'headerRoute'}>
            <Container fluid>
              <Link to={'/'}>
                <img alt='logoHeader' className={'logoHeader'} src={logo} />
              </Link>

              <Navbar.Toggle aria-controls='basic-navbar-nav' />

              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Nav.Link>
                  <Nav.Link className={'HeaderLink'} to={'/add'}>
                    Add
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    );
  }
}
