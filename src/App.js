import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import Zoom from "./pages/Zoom";

const buttonNav = { 
    padding: '5px', 
    margin:'1px', 
    background:'white', 
    color: 'black' 
};

export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <nav style={{ display: 'inline-block' }}>
                    <Link style={buttonNav} to="/">Home</Link>
                    <Link style={buttonNav} to="/zoom">Zoom</Link>
                </nav>
            
                <Route exact path="/" component={Home}/>
                <Route path="/zoom" component={Zoom}/>
            </div>
        </Router>         
        );
    }
}