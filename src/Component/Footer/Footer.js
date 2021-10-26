import React, { Component } from 'react';
import { BrowserRouter as Router, BrowserRouter, Link, NavLink } from 'react-router-dom';
import './Footer.css';

const devReference = [
  { reference: 'https://github.com/Padiilab', responsibility: 'FrontEnd: Mykola Padii' },
  { reference: 'ttps://github.com/Bohdlesk', responsibility: 'BackEnd: Bohdan Leskovets' },
  { reference: 'https://github.com/IllyaPystovga', responsibility: 'Trainee: Illya Pystovgar' },
  { reference: 'https://github.com/TonyLDV', responsibility: 'Trainee: Anton Liediaiev' },
  { reference: 'https://t.me/Oigenius', responsibility: 'QA: Eugene Yakobchuk' },
];
export const Footer = () => {
  return (
    <div className={'contentFooter'}>
      <div className={'footer'}>
        <div>Created By:</div>
        {devReference.map(({ reference, responsibility }, index) => (
          <React.Fragment>
            <a href={reference} target="_blank">
              {responsibility}
            </a>
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
