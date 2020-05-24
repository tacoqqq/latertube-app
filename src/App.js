import React , { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import Header from '../src/components/header/header';
import LandingPage from '../src/routes/landing-page-route';
import HomeMain from './components/home-main/home-main';
import AddGenre from './components/add-genre/add-genre';
import AddVideo from './components/add-video/add-video';
import { LatertubeContext } from './latertube-context';
import { STORE } from './store';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      genres: STORE.GENRES,
      videos: STORE.VIDEOS
    }
  }

  static contextType = LatertubeContext;

  //Add New Genre
  handleAddNewGenre = (newGenre) => {
    this.state.genres.push(newGenre)
    const newGenres = this.state.genres
    this.setState({
      genres: newGenres
    })  
  }

  //Add New Video
  handleAddNewVideo = (newVideo) => {
    this.state.videos.push(newVideo)
    const newVideos = this.state.videos
    this.setState({
      videos: newVideos
    })
  }


  render(){
    return(
      <>
        <LatertubeContext.Provider value={
          {
            genres: this.state.genres,
            videos: this.state.videos,
            addNewGenre: this.handleAddNewGenre,
            addNewVideo: this.handleAddNewVideo
          }
        }
        >
          <Header />
          <main className="app-main-section">
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/home" component={HomeMain} />
                <Route path="/add-genre" component={AddGenre} />
                <Route path="/add-video" component={AddVideo} />
            </Switch>
          </main>
        </LatertubeContext.Provider>
      </>
    )
  }
}

export default App;
