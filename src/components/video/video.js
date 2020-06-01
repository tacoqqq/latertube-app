import React, { Component } from 'react';
import './video.css';
import { LatertubeContext } from '../../latertube-context';
import Rating from '../rating/rating';
import { Link } from 'react-router-dom';

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
                            <Rating score={this.props.video_rating}/>
                            <div className="video-card-info-functions">
                                <a href={this.props.video_url} target="_blank" rel="noopener noreferrer">Watch Now</a>
                                <Link to={`/videos/${this.props.video_id}/edit`}>Edit</Link>
                            </div>
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
