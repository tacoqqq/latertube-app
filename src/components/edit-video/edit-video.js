import React, { Component } from 'react';
import './edit-video.css';
import { LatertubeContext } from '../../latertube-context';
import actions from '../actions/actions';


class EditVideo extends Component {
    constructor(props){
        super(props)
        this.state = {
            videoTitle: '',
            videoUrl: '',
            videoDescription: '',
            videoRating: '',
            videoGenre: '',
            videoGenreErrorMessage: null,
        }
    }

    static contextType = LatertubeContext

    //Handle Title Change
    handleTitleChange = (event) => {
        console.log('hello from title change')
        const newTitle = event.target.value
        this.setState({
            videoTitle: newTitle
        })
    }

    //Handle Url Change
    handleUrlChange = (event) => {
        const newUrl = event.target.value
        this.setState({
            videoUrl: newUrl
        })
    }

    //Handle Description Change
    handleDescriptionChange = (event) => {
        const newDescription = event.target.value
        this.setState({
            videoDescription: newDescription
        })
    }

    //Handle Rating Change
    handleRatingChange = (event) => {
        const newRating = event.target.value
        this.setState({
            videoRating: newRating
        })
    }

    //Handle Genre Change
    handleGenreChange = (event) => {
        const newGenre = event.target.value
        console.log(newGenre)
        const newGenreFound = this.context.genres.find(genre => genre.genre_title === newGenre) 

        if (!newGenreFound) {
            return this.setState({
                videoGenre: "Select a genre..",
                videoGenreErrorMessage: "Must select a genre!"
            })
        }

        this.setState({
            videoGenreErrorMessage: "",
            videoGenre: newGenreFound.genre_title
        })

    }

    //Handle Form Submission
    handleUpdate = (e) => {
        e.preventDefault()

        //handle verification
        if (!this.state.videoTitle || !this.state.videoUrl || !this.state.videoRating) {
            return this.setState({
                videoGenreErrorMessage: "Please fill out required fields!"
            })
        }

        if (this.state.videoGenre === 'Select a genre..'){
            return this.setState({
                videoGenreErrorMessage: "Must select a genre!"
            })
        }

        const youtubeId = this.state.videoUrl.split('v=')[1]

        const updatedVideoInfo = {
            video_id: this.context.videos.find(video => Number(this.props.match.params.videoId) === video.video_id).video_id,
            video_title: this.state.videoTitle,
            video_thumbnail_url: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
            video_url: this.state.videoUrl,
            video_description: this.state.videoDescription,
            video_rating: this.state.videoRating,
            genre_id: this.context.genres.find(genre => genre.genre_title.toLowerCase() === this.state.videoGenre.toLowerCase()).genre_id,
            video_created_time: new Date().toLocaleString()
        }
        this.context.updateVideo(updatedVideoInfo)
        this.props.history.push('/home')
    }

    //Handle Form Cancellation
    handleCancle = () => {
        this.props.history.push('/home')
    }

    handleDelete = () => {
        console.log('delete')
        this.context.deleteVideo(this.context.videos.find(video => Number(this.props.match.params.videoId) === video.video_id).video_id)
        this.props.history.push('/home')
    }

    componentDidMount(){
        document.addEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false);
        const video = this.context.videos.find(video => Number(this.props.match.params.videoId) === video.video_id)
        this.setState({
            videoTitle: video.video_title,
            videoUrl: video.video_url,
            videoDescription: video.video_description,
            videoRating: Number(video.video_rating),
            videoGenre: this.context.genres.find(genre => Number(genre.genre_id) === video.genre_id).genre_title,
            videoGenreErrorMessage: null,
        })
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false);
    }


    render(){
        const genreOptions = this.context.genres.map((genre,i) => <option value={genre.genre_title} key={i}>{genre.genre_title}</option>)
        return(
            <div className="edit-video-wrapper">
                    <header className="edit-video-header-container">
                        <h1 className="edit-video-title">Edit Video</h1>
                    </header>
                    <section className="edit-video-form-container">
                        <form className="edit-video-form" onSubmit={ e => this.handleUpdate(e)}>
                            <div>
                                <label className="name-video-title-label" htmlFor="video-title">Video Title</label>
                                <input className="name-video-title-input" id="video-title" type="text" defaultValue={this.state.videoTitle} onChange={ (e) => this.handleTitleChange(e)}></input>
                            </div>
                            <div>
                                <label className="name-video-url-label" htmlFor="video-url">Video Url</label>
                                <input className="name-video-url-input" samesite="none" id="video-url" type="text" defaultValue={this.state.videoUrl} onChange={ (e) => this.handleUrlChange(e)}></input>
                            </div>
                            <div>
                                <label className="name-video-description-label" htmlFor="video-description">Video Description</label>
                                <textarea className="name-video-description-input" id="video-description" defaultValue={this.state.videoDescription} onChange={ (e) => this.handleDescriptionChange(e)}></textarea>
                            </div>
                            <div>
                                <label htmlFor="video-rating">Video Rating (Scale 1-5)</label>
                                <select value={this.state.videoRating} id="video-rating" onChange={ (e) => this.handleRatingChange(e)} >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="video-genre">Genre</label>
                                <select value={this.state.videoGenre} id="video-genre" onChange={ (e) => this.handleGenreChange(e)}>
                                    <option>Select a genre..</option>
                                    {genreOptions}
                                </select>
                            </div>
                            <div className="error-message">{this.state.videoGenreErrorMessage ? this.state.videoGenreErrorMessage : ''}</div>
                            <div className="edit-video-button-group">
                                <button type="button" onClick={this.handleCancle}>Cancel</button>
                                <button type="submit">Update</button>
                            </div>
                            <div className="delete-video">
                                I want to <span className="delete-video-text" onClick={this.handleDelete}>delete</span> this video.
                            </div>
                        </form>
                    </section>
            </div>    
        )
    }
}

export default EditVideo;