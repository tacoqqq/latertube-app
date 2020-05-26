import React, { Component } from 'react';
import './video-list.css';
import Video from '../video/video';
import { LatertubeContext } from '../../latertube-context';

class VideoList extends Component {

    static contextType = LatertubeContext

    render(){

        const videos = this.props.videos.map((video,i) => <Video {...video} key={i} />)
        return(
            <section className="video-list-wrapper">
                {videos}
            </section>
        )
    }
}

export default VideoList;
