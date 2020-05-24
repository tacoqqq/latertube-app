import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './lp-content.css';

class LandingPageContent extends Component {
    render(){
        return(
            <main role="main" className="lp-main">
                <header role="banner" className="lp-main-header">
                    <h1>LaterTube</h1>
                    <h2>A Youtube Bookmarker</h2>
                    <button><Link to="/home">Try LaterTube</Link></button>
                </header>
                <section className="lp-content-section">
                    <h3>Watch Later, Never Easier</h3>
                    <p>LaterTube stores Youtube videos you want to watch later. Come back anytime to the videos without distractions.</p>
                </section>
                <section className="lp-content-section">
                    <h3>Name Your Own Genre</h3>
                    <p>Cooking. Singing. Learning. Name your own video genres and categorize the videos for easier future search.</p>
                </section>
                <section className="lp-content-section">
                    <h3>LaterTube Now</h3>
                    <p>Experience LaterTube with just one click.</p>
                    <button><Link to="/home">LaterTube Demo</Link></button>    
            </section>
          </main>            
        )
    }
}

export default LandingPageContent;