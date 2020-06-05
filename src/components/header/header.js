import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './header.css';

class Header extends Component {

    render(){
        return(
          <div className="header-wrapper">
            <Switch>
                <Route exact path="/" render={props => {
                    return <nav role="navigation">
                        <div className="nav-title"><img className="app-logo" alt="app logo" src={require('../../img/apple-touch-icon.png')} /><NavLink to="/">LaterTube</NavLink></div>
                        <ul className="nav-menu">
                            <li><NavLink to="/home">Demo</NavLink></li>
                        </ul>
                    </nav>
                }}/>
                <Route exact path="/home" render={props => {
                    return <nav role="navigation">
                        <div className="nav-title"><img className="app-logo" alt="app logo" src={require('../../img/apple-touch-icon.png')} /><NavLink to="/">LaterTube</NavLink></div>
                        <ul className="nav-menu">
                            <li className="nav-menu-item"><NavLink to="/home">Home</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-genre">+ Genre</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-video">+ Video</NavLink></li>
                        </ul>
                    </nav>
                }} />
                <Route exact path="/add-genre" render={props => {
                    return <nav role="navigation">
                        <div className="nav-title"><img className="app-logo" alt="app logo" src={require('../../img/apple-touch-icon.png')} /><NavLink to="/">LaterTube</NavLink></div>
                        <ul className="nav-menu">
                            <li className="nav-menu-item"><NavLink to="/home">Home</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-genre">+ Genre</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-video">+ Video</NavLink></li>
                        </ul>
                    </nav>
                }} />
                <Route exact path="/add-video" render={props => {
                    return <nav role="navigation">
                        <div className="nav-title"><img className="app-logo" alt="app logo" src={require('../../img/apple-touch-icon.png')} /><NavLink to="/">LaterTube</NavLink></div>
                        <ul className="nav-menu">
                            <li className="nav-menu-item"><NavLink to="/home">Home</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-genre">+ Genre</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-video">+ Video</NavLink></li>
                        </ul>
                    </nav>
                }} />
                <Route exact path="/videos/:videoId/edit" render={props => {
                    return <nav role="navigation">
                        <div className="nav-title"><img className="app-logo" alt="app logo" src={require('../../img/apple-touch-icon.png')} /><NavLink to="/">LaterTube</NavLink></div>
                        <ul className="nav-menu">
                            <li className="nav-menu-item"><NavLink to="/home">Home</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-genre">+ Genre</NavLink></li>
                            <li className="nav-menu-item"><NavLink to="/add-video">+ Video</NavLink></li>
                        </ul>
                    </nav>
                }} />
            </Switch>
          </div>
        )
    }
}

export default Header;