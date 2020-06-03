import React from 'react';
import ReactDOM from 'react-dom';
import AddVideo from './add-video';
import {BrowserRouter as Router} from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddVideo /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
})