import React, { Component } from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './About.css';
import { Link } from 'react-router-dom';

export default class About extends Component {
  onBackToHome = () => {
    this.setState({ isAddNew: false });
  };

  render() {
    return (
      <>
        <div className={'content'}>
          <Header />
          <div className={'wrapperHome'}>
            <div className={'containerHome'}>
              <div className={'contentHome column'}>
                <div className={'about'}>
                  <i className='fas fa-user-circle'></i>
                  <h2>
                    FrontEnd: <br /> Mykola Padii
                  </h2>
                  <LoremIpsum p={2} />
                </div>
                <div className={'about'}>
                  <i className='fas fa-user-circle'></i>
                  <h2>
                    BackEnd: <br /> Bohdan Leskovets
                  </h2>
                  <LoremIpsum p={2} />
                </div>
                <div className={'about'}>
                  <i className='fas fa-user-circle'></i>
                  <h2>
                    Trainee: <br /> Illya Pystovgar
                  </h2>
                  <LoremIpsum p={1} />
                </div>
                <div className={'about'}>
                  <i className='fas fa-user-circle'></i>
                  <h2>
                    Trainee: <br /> Anton Liediaiev
                  </h2>
                  <LoremIpsum p={1} />
                </div>
                <div className={'about'}>
                  <i className='fas fa-user-circle'></i>
                  <h2>
                    QA: <br /> Eugene Yakobchuk
                  </h2>
                  <LoremIpsum p={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
