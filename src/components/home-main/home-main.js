import React, { Component } from 'react';
import './home-main.css';
import Filter from '../filter/filter';
import VideoList from '../video-list/video-list';


class HomeMain extends Component {
    render(){
        return(
            <div className="home-wrapper">
                <div className="filter-wrapper">
                    <Filter />
                    <VideoList />
                </div>
            </div>
        )
    }

}

export default HomeMain;