import Parallax from 'parallax-js';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import { Header, Footer, Loader } from './components';
import { Home, About, AddNewRestaurant } from './pages';
import {Diplom} from "./pages/diplom/diplom";

export const App = () => {
  const [loading, setLoading] = useState(true);

  const demoAsyncCall = () => {
    const scene = document.getElementById('sceneForParallax');
    new Parallax(scene);
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  };

  useEffect(async () => {
    await demoAsyncCall();

    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
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
                  <Route exact path="/diplom" component={Diplom} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </switch>
      </Router>
    </div>
  );
};
