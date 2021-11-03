import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';

import './header.css';
import logo from './rest-view.png';

export const Header = () => {
  const location = useLocation();

  const getIsActive = name => {
    return name === location?.pathname;
  };

  return (
    <div className={'headerContainer'}>
      <div className={'navbarWrapper'}>
        <Navbar className={'headerRoute'} expand="sm">
          <Container fluid className="navbarContainer">
            <div className="navbarRight">
              <Link to={'/'}>
                <img alt="logoHeader" className={'logoHeader'} src={logo} />
              </Link>
            </div>
            <Navbar.Toggle className="navbarToggle" aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="mr-auto">
                <Link className={`hover-HeaderLink-animation ${getIsActive('/') && 'activeHeaderLink'}`} to={'/'}>
                  Home
                </Link>
                <Link className={`hover-HeaderLink-animation ${getIsActive('/add') && 'activeHeaderLink'}`} to={'/add'}>
                  Add
                </Link>
                <Link
                  className={`hover-HeaderLink-animation ${getIsActive('/about') && 'activeHeaderLink'}`}
                  to={'/about'}>
                  About Us
                </Link>
              </Nav>

              <Dropdown>
                <Dropdown.Toggle variant={'transparent'} size="sm" className="userToggle" autoClose="outside">
                  <img
                    alt="userHeader"
                    className={'userHeader'}
                    src="http://www.jma.duq.edu/users/ribeaua/pub/jma260/images/profile.png"
                  />
                </Dropdown.Toggle>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
