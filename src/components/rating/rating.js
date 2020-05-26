import React, { Component } from 'react';
import './rating.css'

class Rating extends Component {

    render(){
        const starArray = new Array(5).fill(null)
        const starRating = starArray.map((_,i) => {
            if (i < this.props.score) {
                return <span key={i}>&#9733;</span>
            } else {
                return <span key={i}>&#9734;</span>
            }
        } )
        return(
            <div className="video-rating">
                {starRating}
            </div>
        )
    }
}

export default Rating;