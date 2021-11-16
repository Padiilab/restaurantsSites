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
                <Dropdown.Toggle variant={'transparent'} size="sm" className="userToggle" autoClose={false}>
                  <img
                    alt="userHeader"
                    className={'userHeader'}
                    src="http://www.jma.duq.edu/users/ribeaua/pub/jma260/images/profile.png"
                  />
                </Dropdown.Toggle>
                <div className="enter">
                  <Dropdown.Menu className="enter">
                    <div className="emailForm">
                      <Dropdown.Item href="#">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
