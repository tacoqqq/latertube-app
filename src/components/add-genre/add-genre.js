import React, { Component } from 'react';
import './add-genre.css';
import { uuid } from 'uuidv4';
import { withRouter } from 'react-router-dom';
import { LatertubeContext } from '../../latertube-context';
import actions from '../actions/actions';

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
            genre_id: uuid(),
            genre_title: this.state.videoGenre,
            genre_created_time: new Date().toLocaleString()
        }
        this.context.addNewGenre(newGenre)
        this.props.history.push('/home')
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