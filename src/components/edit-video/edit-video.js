import React, { Component } from 'react';
import './edit-video.css';
import { LatertubeContext } from '../../latertube-context';
import actions from '../actions/actions';
import config from '../../config';


class EditVideo extends Component {
    constructor(props){
        super(props)
        this.state = {
            videoTitle: '',
            videoUrl: '',
            videoDescription: '',
            videoRating: '',
            videoGenre: '',
            videoGenreArray: [],
            videoGenreErrorMessage: null,
        }
    }

    static contextType = LatertubeContext

    //Handle Title Change
    handleTitleChange = (event) => {
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
        const newGenreFound = this.context.genres.find(genre => genre.genre_title === newGenre) 

        if (!newGenreFound) {
            return this.setState({
                videoGenre: "Select a genre..",
                videoGenreErrorMessage: "Must select a genre!"
            })
        } else {
            this.setState({
                videoGenreErrorMessage: "",
                videoGenre: newGenreFound.genre_title
            })
        }
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

        const updatedVideoInfo = {
            video_id: this.props.match.params.videoId,
            video_title: this.state.videoTitle,
            video_url: this.state.videoUrl,
            video_description: this.state.videoDescription,
            video_rating: this.state.videoRating,
            genre_id: this.context.genres.find(genre => genre.genre_title.toLowerCase() === this.state.videoGenre.toLowerCase()).genre_id,
            video_created_time: new Date().toLocaleString()
        }

        fetch(`${config.API_ENDPOINT}/videos/${this.props.match.params.videoId}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedVideoInfo)
        })
            .then(response => {
                if (!response.ok){
                    throw new Error(response.error)
                }
                return response.json()
            })
            .then(responseJSON => {
                console.log(responseJSON)
                this.context.updateVideo(responseJSON)
                this.props.history.goBack()
            })
            .catch(err => {
                this.setState({
                    videoGenreErrorMessage: err.message
                })
            })
    }

    //Handle Form Cancellation
    handleCancle = () => {
        this.props.history.push('/home')
    }

    handleDelete = () => {
        fetch(`${config.API_ENDPOINT}/videos/${this.props.match.params.videoId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok){
                throw new Error(response.error)
            }
        })
        .then(responseJSON => {
            this.context.deleteVideo(this.props.match.params.videoId)
            this.props.history.push('/home')
        })
    }


    componentDidMount(){
        document.addEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false);
        console.log('component did mount')
        let videoGenreArray;

        if (this.context.genres.length === 0){
            console.log('in this context')
            fetch(`${config.API_ENDPOINT}/genres`)
            .then(res => {
              if (!res.ok){
                throw new Error(res.error)
              } 
              return res.json()
            })
            .then(resJson => {
                console.log(resJson)
                videoGenreArray = resJson
                return videoGenreArray
            })
            .catch(err => {
                this.setState({
                    videoGenreErrorMessage: err.message
                })
            })
        }

        fetch(`${config.API_ENDPOINT}/videos/${this.props.match.params.videoId}`)
            .then(response => {
                if (!response.ok){
                    throw new Error(response.error)
                }
                return response.json()
            })
            .then(responseJSON => {
                console.log('fetched dasa from API')
                console.log(responseJSON)
                this.setState({
                    videoTitle: responseJSON.video_title,
                    videoUrl: responseJSON.video_url,
                    videoDescription: responseJSON.video_description,
                    videoRating: Number(responseJSON.video_rating),
                    videoGenre: this.context.genres.length > 0 
                        ? this.context.genres.find(genre => Number(genre.genre_id) === responseJSON.genre_id).genre_title 
                        : videoGenreArray.find(genre => Number(genre.genre_id) === responseJSON.genre_id).genre_title,
                    videoGenreErrorMessage: null,
                })
            })
            .catch(err => {
                this.setState({
                    videoGenreErrorMessage: err.message
                })
            })
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false);
    }


    render(){
        console.log('component render')
        const genreOptions = this.context.genres.length > 0
            ? this.context.genres.map((genre,i) => <option value={genre.genre_title} key={i}>{genre.genre_title}</option>)
            : ''
        console.log(genreOptions)
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