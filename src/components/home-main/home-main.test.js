import React from 'react';
import ReactDOM from 'react-dom';
import HomeMain from './home-main';

it('renders without crashing', () => {
    //test windows.scroll()
    const scrollToSpy = jest.fn();
    global.scrollTo = scrollToSpy;
    const div = document.createElement('div');
    ReactDOM.render(<HomeMain/> , div);
    expect(scrollToSpy).toHaveBeenCalled();
    ReactDOM.unmountComponentAtNode(div);
})