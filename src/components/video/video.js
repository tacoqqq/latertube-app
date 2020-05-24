import React, { Component } from 'react';
import './video.css';
import { LatertubeContext } from '../../latertube-context';

class Video extends Component {

    static contextType = LatertubeContext

    render(){
        const genrename = this.context.genres.find(genre => genre.genre_id === this.props.genre_id).genre_title

        return(
            <div className="video-container">
                <div className="video-card">
                    <div className="video-thumbnail">
                        <div className="video-cover-photo">
                            <img className="video-thumbnail-img" src={this.props.video_thumbnail_url} alt="video-thumbnail" />
                        </div>
                        <div className="video-title">{this.props.video_title}</div>
                    </div>
                    <div className="video-card-info-conatiner">
                        <div className="video-genre">Video Genre: {genrename}</div>
                        <div className="video-card-info-second-row">
                            <div className="rating">{this.props.video_rating}<span role="img" aria-label="thumbs-up">👍</span></div>
                            <ul className="video-card-info-functions">
                                <li><a href={this.props.video_url} target="_blank" rel="noopener noreferrer">Watch Now</a></li>
                                <li><a href="/home">Edit</a></li>
                                <li><a href="/home">Delete</a></li>
                            </ul>
                        </div>
                        <div className="video-card-info-container-expand">
                            <div className="description">
                                {this.props.video_description}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Video;
