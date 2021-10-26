import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';

import './Header.css';
import logo from './RestView.png';

export const Header = () => {
  const location = useLocation();

  const getIsActive = name => {
    return name === location?.pathname;
  };

  return (
    <div className={'headerContainer'}>
      <div className={'navbarWrapper'}>
        <Navbar className={'headerRoute'}>
          <Container fluid className="navbarContainer">
            <div className="navbarRight">
              <Link to={'/'}>
                <img alt="logoHeader" className={'logoHeader'} src={logo} />
              </Link>
            </div>
            <Nav className="mr-auto">
              <Link
                className={`hover-HeaderLink-animation ${getIsActive('/') && 'activeHeaderLink'}`}
                to={'/'}
                activeClassName={'activeHeaderLink'}>
                Home
              </Link>
              <Link
                className={`hover-HeaderLink-animation ${getIsActive('/add') && 'activeHeaderLink'}`}
                to={'/add'}
                activeClassName={'activeHeaderLink'}>
                Add
              </Link>
              <Link
                className={`hover-HeaderLink-animation ${getIsActive('/about') && 'activeHeaderLink'}`}
                to={'/about'}
                activeClassName={'activeHeaderLink'}>
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

              <Dropdown.Menu>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
