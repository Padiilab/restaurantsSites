import React, {Component} from "react";
import 'bootstrap';
import {BrowserRouter as Router, BrowserRouter, Link, NavLink} from "react-router-dom";
import {Navbar} from 'react-bootstrap'
import './Header.css'
import Container from "react-bootstrap/Container";

export default class header extends Component {
    render() {
        return (
            <div className={'headerContainer'}>
                <Navbar>
                    <Link className={'HeaderLink'} to={'/'}>Главная</Link>
                    <Link className={'HeaderLink'} to={'/about'}>Рестораны</Link>
                </Navbar>
            </div>
        );
    }
}