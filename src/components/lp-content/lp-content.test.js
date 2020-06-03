import React from 'react';
import ReactDOM from 'react-dom';
import LandingPageContent from './lp-content';
import {BrowserRouter as Router} from 'react-router-dom'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><LandingPageContent /></Router> , div);
    ReactDOM.unmountComponentAtNode(div);
})