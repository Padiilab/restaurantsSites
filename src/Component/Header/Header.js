import React, {Component} from "react";
import {BrowserRouter as Router, BrowserRouter, Link, NavLink} from "react-router-dom";
import {Navbar} from 'react-bootstrap'
import './Header.css'

export default class header extends Component {
    render() {
        return (
            <div className={'headerContainer'}>
                <div className={"navbarWrapper"}>
                <Navbar className={'headerRoute'}>
                    <Link className={'HeaderLink'} to={'/'}>Home</Link>
                    <Link className={'HeaderLink'} to={'/about'}>Restaurants</Link>
                </Navbar>
                </div>
            </div>
        );
    }
}