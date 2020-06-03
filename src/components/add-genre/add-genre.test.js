import React from 'react';
import ReactDOM from 'react-dom';
import AddGenre from './add-genre';
import {BrowserRouter as Router} from 'react-router-dom';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddGenre /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
})