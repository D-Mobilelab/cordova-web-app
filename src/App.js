import React, { Component } from 'react';
import { 
    Page
    , Toolbar
    , ToolbarButton
    , Icon
    , Checkbox
    , ListItem
    , List
    , ListHeader
    , Button
    , Range
    , Carousel
    , CarouselItem
} from 'react-onsenui';

import * as api from './api/api.js';

export default class App extends Component {
    constructor() {
        super(...arguments);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            isFetching: false,
            articles: []
        }
    }
    
    async componentDidMount() {
        this.setState({ isFetching: true });
        const articles = await api.getArticles();
        this.setState({ isFetching: false, articles });        
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className='center'>Example app Test</div>
            </Toolbar>
        );
    }

    renderRow(row) {
        return (<ListItem key={row.id} tappable>
            {row.title}
        </ListItem>);
    }
    
    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <List
                    dataSource={this.state.articles}
                    renderHeader={() => <ListHeader>Articoli</ListHeader>}
                    renderRow={this.renderRow}
                />
            </Page>       
        );
    }
}