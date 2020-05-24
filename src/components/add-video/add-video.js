import React, { Component } from 'react';
import './add-video.css'
import { uuid } from 'uuidv4';
import { withRouter } from 'react-router-dom';
import { LatertubeContext } from '../../latertube-context';

class AddVideo extends Component {
    constructor(props){
        super(props)
        this.state = {
            videoTitle: '',
            videoUrl: '',
            videoDescription: '',
            videoRating: 1,
            videoGenreId: 'Select a genre..',
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
        this.setState({
            videoGenreErrorMessage: ''
        })
        const newGenre = event.target.value
        const newGenreFound = this.context.genres.find(genre => genre.genre_title === newGenre) 

        if (!newGenreFound) {
            this.setState({
                videoGenreErrorMessage: "Must select a genre!"
            })
        }

        this.setState({
            videoGenreId: newGenreFound.genre_id
        })

    }

    //Handle Form Submission
    handleSubmit = (e) => {
        e.preventDefault()

        //handle verification
        if (!this.state.videoTitle || !this.state.videoUrl || !this.state.videoRating) {
            return "Please fill out requiredd fields!"
        }

        if (this.state.videoGenreId === 'Select a genre..'){
            return this.setState({
                videoGenreErrorMessage: "Must select a genre!"
            })
        }

        const youtubeId = this.state.videoUrl.split('v=')[1]

        const newVideo = {
            video_id: uuid(),
            video_title: this.state.videoTitle,
            video_thumbnail_url: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
            video_url: this.state.videoUrl,
            video_description: this.state.videoDescription,
            video_rating: this.state.videoRating,
            genre_id: this.state.videoGenreId,
            video_created_time: new Date().toLocaleString()
        }
        this.context.addNewVideo(newVideo)
        this.props.history.push('/home')
    }

    //Handle Form Cancellation
    handleCancle = () => {
        this.props.history.push('/home')
    }

    render(){

        const genreOptions = this.context.genres.map((genre,i) => <option key={i}>{genre.genre_title}</option>)

        return(
            <div className="add-video-wrapper">
                    <header className="add-video-header-container">
                        <h1 className="add-video-title">Add New Video</h1>
                    </header>
                    <section className="add-video-form-container">
                        <form className="add-video-form" onSubmit={ e => this.handleSubmit(e)}>
                            <div>
                                <label className="name-video-title-label" htmlFor="video-title">Video Title</label>
                                <input className="name-video-title-input" id="video-title" type="text" required placeholder="Matcha Cheesecake Tutorial" onChange={ (e) => this.handleTitleChange(e)}></input>
                            </div>
                            <div>
                                <label className="name-video-url-label" htmlFor="video-url">Video Url</label>
                                <input className="name-video-url-input" id="video-url" type="text" required placeholder="https://www.youtube.com/watch?v=NRlYiTPPo7A" onChange={ (e) => this.handleUrlChange(e)}></input>
                            </div>
                            <div>
                                <label className="name-video-description-label" htmlFor="video-description">Video Description</label>
                                <textarea className="name-video-description-input" id="video-description" placeholder="This recipe has more than 33k views. One of the most popular matcha basque cheesecake recipe videos on Youtube." onChange={ (e) => this.handleDescriptionChange(e)}></textarea>
                            </div>
                            <div>
                                <label htmlFor="video-rating">Video Rating (Scale 1-5)</label>
                                <select defaultValue={1} id="video-rating" onChange={ (e) => this.handleRatingChange(e)} >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="video-genre">Genre</label>
                                <select required id="video-genre" onChange={ (e) => this.handleGenreChange(e)}>
                                    <option>Select a genre..</option>
                                    {genreOptions}
                                </select>
                            </div>
                            <div className="error-message">{this.state.videoGenreErrorMessage ? this.state.videoGenreErrorMessage : ''}</div>
                            <div className="add-video-button-group">
                                <button type="button" onClick={this.handleCancle}>Cancel</button>
                                <button type="submit">Create</button>
                            </div>
                        </form>
                    </section>
            </div>    
        )
    }

}

export default withRouter(AddVideo)