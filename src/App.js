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
    constructor(){
        super(...arguments);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            articles: []
        }
    }
    
    async componentDidMount() {
        const articles = await api.getArticles();
        this.setState({ articles });
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className='center'>Example app</div>
            </Toolbar>
        );
    }

    renderRow(row) {
        return (<ListItem key={row} tappable>
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