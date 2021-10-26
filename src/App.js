import './App.css';
import Parallax from 'parallax-js';
import React, { Component } from 'react';
import logo from './Component/Header/RestView.png';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './Component/Home/Home';
import { About } from './Component/About/About';
import { Header } from './Component/Header/Header';
import { Footer } from './Component/Footer/Footer';
import { AddNewRestaurant } from './Component/Home/AddNewRestaurant';

export default class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  demoAsyncCall() {
    const scene = document.getElementById('sceneForParallax');
    const parallaxInstance = new Parallax(scene);
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className={'wrapperPreLoader'}>
          <div id={'sceneForParallax'} className={'wrapperLogo'}>
            <img alt={'logo'} data-depth={'1.5'} src={logo} />
            <div data-depth={'1'} className={'preLoader spinner-grow text-warning'} />
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <Router>
          <switch>
            <div className={'content'}>
              <Header />
              <div className={'wrapperHome'}>
                <div className={'containerHome'}>
                  <div className={'contentHome'}>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/add" component={AddNewRestaurant} />
                    <Route exact path="/" component={Home} />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </switch>
        </Router>
      </div>
    );
  }
}
