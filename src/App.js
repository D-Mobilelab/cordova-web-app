import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const config = [{
    path: '/',
    component: 'Home',
    exact: true
}, {
    path: '/zoom',
    component: 'Zoom'
}];

export default class App extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            routes: []
        }
    }
    
    componentWillMount(){
        let routes = config.map((route, i) => {
            System.import('./pages/' + route.component).then(dynComponent => {
                this.setState((state, props) => { 
                    route.component = dynComponent.default;
                    return { routes: state.routes.concat(route) };
                });
            });
        });
    }

    render() {
        let routesJSX = this.state.routes.map((route, i) => (
            <Route key={i} {...route} />
        ));

        return (
            <Router>
                <div>
                    <p>header</p>
                    {routesJSX}
                </div>
            </Router>                
        );
    }
}