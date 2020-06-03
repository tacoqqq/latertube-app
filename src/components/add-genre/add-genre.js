import React, { Component } from 'react';
import './add-genre.css';
import { withRouter } from 'react-router-dom';
import { LatertubeContext } from '../../latertube-context';
import actions from '../../actions/actions';
import config from '../../config';

class AddGenre extends Component {
    constructor(props){
        super(props)
        this.state = {
            videoGenre: '',
            errorMessage: null
        }
    }

    static contextType = LatertubeContext


    //Handle form submission    
    handleSubmit = (e) => {
        e.preventDefault()

        if (!this.state.videoGenre) {
            return this.setState({
                errorMessage: 'Please enter a genre title.'
            })
        }

        const newGenre = {
            genre_title: this.state.videoGenre,
        }

        fetch(`${config.API_ENDPOINT}/genres`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newGenre) 
        })
            .then(response => {
                if (!response.ok){
                    throw new Error(response.error)
                }
                return response.json()
            })
            .then(responseJSON => {
                this.context.addNewGenre(responseJSON)
                this.props.history.push('/home')
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message
            })
        })
    }

    //Handle Title Change
    handleTitleChange = (event) => {
        const newTitle = event.target.value
        this.setState({
            videoGenre: newTitle
        })
    }

    //handle Cancle
    handleCancle = () => {
        this.props.history.push('/home')
    }

    //Users can press the esc key to leave this page and go back to homepage
    componentDidMount(){
        document.addEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false)
    }

    render(){
        return(
            <div className="add-genre-wrapper">
                <header className="add-genre-header-container">
                    <h1 className="add-genre-title">Add New Genre</h1>
                </header>
                <section className="add-genre-form-container">
                    <form className="add-genre-form" onSubmit={ e => this.handleSubmit(e)}>
                        <label className="name-video-genre-label" htmlFor="video-name">Name Your Video Genre</label>
                        <input required className="name-video-genre-input" id="video-name" type="text" placeholder="Dessert Recipe" onChange={ (e) => this.handleTitleChange(e)}></input>
                        <div className="error-message">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
                        <div className="add-genre-button-group">
                            <button type="button" onClick={this.handleCancle}>Cancel</button>
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </section>
            </div>    
        )
    }
}

export default withRouter(AddGenre);