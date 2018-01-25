import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Zoom from "./pages/Zoom";

export default class App extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/zoom" component={Zoom}/>
            </div>
        </Router>         
        );
    }
}