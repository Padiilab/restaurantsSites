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
          <Navbar collapseOnSelect expand='sm' className={'headerRoute'}>
            <Container fluid>
              <Link to={'/'}>
                <img alt='logoHeader' className={'logoHeader'} src={logo} />
              </Link>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Link className={'HeaderLink'} to={'/'}>
                    Home
                  </Link>
                  <Link className={'HeaderLink'} to={'/add'}>
                    Add
                  </Link>
                  <Link className={'HeaderLink'} to={'/about'}>
                    About Us
                  </Link>
                  <Link className={'HeaderLink'} to={'/contacts'}>
                    Contacts
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    );
  }
}
