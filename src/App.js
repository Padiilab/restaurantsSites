import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import home from "./Component/Home/Home";
import about from "./Component/About/About";
import React from "react";
import Header from "./Component/Header/Header";

function App() {
    return (

        <div className="App">
            <Router>
                <switch>
                    <Route exact path="/about" component={about}/>
                    <Route exact path="/" component={home}/>
                </switch>
            </Router>
        </div>

    )
        ;
}

export default App;
