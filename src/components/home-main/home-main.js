import React, { Component } from 'react';
import './home-main.css';
import Filter from '../filter/filter';
import VideoList from '../video-list/video-list';
import { LatertubeContext } from '../../latertube-context';


class HomeMain extends Component {
    static contextType = LatertubeContext

    /*
    state = {
        genres: this.context.genres,
        videos: this.context.videos || [],
        filteredVideos: this.context.videos || [],
    }
    */


    render(){
        return(
            <div className="home-wrapper">
                <div className="filter-wrapper">
                    <Filter handleFilter={this.handleFilter} />
                    <VideoList videos={this.context.filteredVideos}  />
                </div>
            </div>
        )
    }

}

export default HomeMain;