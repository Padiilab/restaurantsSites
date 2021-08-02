import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  BrowserRouter,
  Link,
  NavLink
} from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={'contentFooter'}>
        <div className={'footer'}>
          <div>Created By:</div>
          <br />
          <a href='https://github.com/Padiilab' target='_blank'>
            FrontEnd: Mykola Padii
          </a>
          <br />
          <a href='https://github.com/Bohdlesk' target='_blank'>
            BackEnd: Bohdan Leskovets
          </a>
          <br />
          <a href='https://github.com/IllyaPystovga' target='_blank'>
            Trainee: Illya Pystovgar
          </a>
          <br />
        </div>
      </div>
    );
  }
}
