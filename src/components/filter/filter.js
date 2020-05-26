import React, { Component } from "react";
import "./filter.css";
import { LatertubeContext } from "../../latertube-context";

class Filter extends Component {
    constructor(props){
        super(props)
        this.state= {
            filterTitle: "",
            filterRating: 1,
            filterGenre: null,
        }
    }

    static contextType = LatertubeContext

    //Submit changes for filtering
    handleSubmitChange = () => {
        this.props.handleFilter(this.state.filterTitle, this.state.filterRating, this.state.filterGenre)
    }

    //On Title Change
    handleTitleChange = (event) => {
        const keyword = event.target.value
        console.log(keyword)
        this.setState({
            filterTitle: keyword,
        },  () => this.handleSubmitChange())
    }

    //On Rating Change
    handleRatingChange = (event) => {
        const rating = event.target.value
        console.log(rating)
        this.setState({
            filterRating: rating
        }, () => this.handleSubmitChange())
    }

    //On Genre Change
    handleGenreChange = (event) => {
        const videoGenre = event.target.value.toLowerCase()
        console.log(videoGenre)
        if (videoGenre === "all videos"){
            console.log("in all videos")
            return this.setState({
                filterGenre: null
            } , () => this.handleSubmitChange())  
        } else {
            console.log("in genre")
            const genreId = this.context.genres.find(genre => genre.genre_title.toLowerCase() === videoGenre ).genre_id
            console.log(genreId)
            this.setState({
                filterGenre: genreId
            } , () => this.handleSubmitChange())
        }
    }

    render(){
        const genreOptions = this.context.genres.map((genre,i) => <option value={genre.genre_title} key={i}>{genre.genre_title}</option>)
        const videoCounts = this.context.videos.length
        const startTime = this.context.videos[0].video_created_time
        return(
            <div className="filter-container">
                <form className="filter-form">
                    <h3>You have saved <span className="video-count">{videoCounts}</span> LaterTubes since {startTime}</h3>
                    <div className="filter-condition">
                        <input id="title-filter" type="text" required placeholder="Search videos by title" value={this.state.filterTitle} onChange={e => this.handleTitleChange(e)}></input>
                    </div>
                    <div className="filter-condition">
                        <select id="rating-filter" onChange={e => this.handleRatingChange(e)}>
                            <option value={1}>&#9733; &#38; UP</option>
                            <option value={2}>&#9733;&#9733; &#38; UP</option>
                            <option value={3}>&#9733;&#9733;&#9733; &#38; UP</option>
                            <option value={4}>&#9733;&#9733;&#9733;&#9733; &#38; UP</option>
                            <option value={5}>&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                        </select>   
                    </div>
                    <div className="filter-condition">
                        <select id="genre-filter" onChange={e => this.handleGenreChange(e)}>
                            <option value="all videos">All Videos</option>
                            {genreOptions}
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter;
