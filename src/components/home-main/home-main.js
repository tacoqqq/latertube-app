import React, { Component } from 'react';
import './home-main.css';
import Filter from '../filter/filter';
import VideoList from '../video-list/video-list';
import { LatertubeContext } from '../../latertube-context';


class HomeMain extends Component {
    static contextType = LatertubeContext

    state = {
        genres: this.context.genres || [],
        videos: this.context.videos || [],
        filteredVideos: this.context.videos || [],
    }

    handleFilter = (keyword, rating, genreId) => {
        const videosIncludeKeyword = this.state.videos.filter(video => video.video_title.toLowerCase().includes(keyword.toLowerCase()))
        const videosMatchRating = videosIncludeKeyword.filter(video => Number(video.video_rating) >= Number(rating))
        const videosMatchGenre = genreId ? videosMatchRating.filter(video => video.genre_id === genreId ) : videosMatchRating
        this.setState({
            filteredVideos: videosMatchGenre
        })
    }


    render(){
        return(
            <div className="home-wrapper">
                <div className="filter-wrapper">
                    <Filter handleFilter={this.handleFilter} />
                    <VideoList videos={this.state.filteredVideos}  />
                </div>
            </div>
        )
    }

}

export default HomeMain;