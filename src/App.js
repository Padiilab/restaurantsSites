import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import home from './Component/Home/Home';
import about from './Component/About/About';
import React, { Component } from 'react';
import logo from './Component/Header/RestView.png';
import Parallax from 'parallax-js';

export default class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  demoAsyncCall() {
    const scene = document.getElementById('sceneForParallax');
    const parallaxInstance = new Parallax(scene);
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className={'wrapperPreLoader'}>
          <div id={'sceneForParallax'} className={'wrapperLogo'}>
            <img alt={'logo'} data-depth={'1.5'} src={logo} />
            <div
              data-depth={'1'}
              className={'preLoader spinner-grow text-warning'}
            />
          </div>
        </div>
      );
    }
    return (
      <div className='App'>
        <Router>
          <switch>
            <Route exact path='/about' component={about} />
            <Route exact path='/' component={home} />
          </switch>
        </Router>
      </div>
    );
  }
}
