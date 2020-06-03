import React, { Component } from 'react';
import './home-main.css';
import Filter from '../filter/filter';
import VideoList from '../video-list/video-list';
import { LatertubeContext } from '../../latertube-context';


class HomeMain extends Component {
    static contextType = LatertubeContext

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render(){
        return(
            <div className="home-wrapper">
                <div className="filter-wrapper">
                    <Filter handleFilter={this.handleFilter} />
                    {this.context.filteredVideos.length > 0 
                        ? <VideoList videos={this.context.filteredVideos} /> 
                        : <section className="no-result-message">No Result</section>}
                </div>
            </div>
        )
    }

}

export default HomeMain;