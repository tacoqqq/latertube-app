import React, { Component } from 'react';
import './add-genre.css';
import { withRouter } from 'react-router-dom';
import { LatertubeContext } from '../../latertube-context';
import actions from '../actions/actions';
import config from '../../config';

class AddGenre extends Component {
    constructor(props){
        super(props)
        this.state = {
            videoGenre: ''
        }
    }

    static contextType = LatertubeContext

    handleSubmit = (e) => {
        e.preventDefault()
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
                console.log(err.message)
            })
    }


    handleTitleChange = (event) => {
        const newTitle = event.target.value
        this.setState({
            videoGenre: newTitle
        })
    }

    handleCancle = () => {
        this.props.history.push('/home')
    }

    componentDidMount(){
        document.addEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", (e) => actions.escFunction(e, this.props.history), false);
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
                            <input className="name-video-genre-input" id="video-name" type="text" placeholder="Dessert Recipe" onChange={ (e) => this.handleTitleChange(e)}></input>
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

export default withRouter(AddGenre)