import React from 'react';
import ReactDOM from 'react-dom';
import EditVideo from './edit-video';
import {BrowserRouter as Router} from 'react-router-dom';

it ('renders without crashing', () => {
  const scrollToSpy = jest.fn();
  global.scrollTo = scrollToSpy;
  const div = document.createElement('div');
  ReactDOM.render(<Router><EditVideo match={{params: {id: 1}, isExact: true, path: "", url: ""}}/></Router>, div);
  expect(scrollToSpy).toHaveBeenCalled();
  ReactDOM.unmountComponentAtNode(div);
})
