import React, {Component} from "react";
import {BrowserRouter as Router, BrowserRouter, Link, NavLink} from "react-router-dom";
import {Navbar} from 'react-bootstrap'
import './Header.css'
import logo from './RestView.png';

export default class header extends Component {
    render() {
        return (
            <div className={'headerContainer'}>
                <div className={"navbarWrapper"}>
                <Navbar className={'headerRoute'}>
                    <Link to={'/'}> <img className={'logoHeader'} src={logo} /></Link>
                    <Link className={'HeaderLink'} to={'/'}>Home</Link>
                    <Link className={'HeaderLink'} to={'/'}>Restaurants</Link>
                </Navbar>
                </div>
            </div>
        );
    }
}