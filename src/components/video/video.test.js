import React from 'react';
import ReactDOM from 'react-dom';
import Video from './video';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Video/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
})