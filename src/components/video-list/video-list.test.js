import React from 'react';
import ReactDOM from 'react-dom';
import VideoList from './video-list';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoList /> , div);
    ReactDOM.unmountComponentAtNode(div);
})