import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const config = [{
    path: '/',
    component: 'Home'
}, {
    path: '/zoom',
    component: 'Zoom'
}];

export default class App extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            component: null
        }
    }
    
    componentWillMount(){
        let routes = config.map((route, i) => {
            System.import('./pages/' + route.component).then(dynComponent => {
                this.setState({ component: dynComponent.default })
            });
        });
    }

    render() {
        

        return (
            <Router>
                <div>
                    <p>header</p>
                    {this.state.component ? <Route path='/' component={this.state.component} /> : null}
                </div>
            </Router>                
        );
    }
}