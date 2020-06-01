import React , { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import Header from '../src/components/header/header';
import LandingPage from '../src/routes/landing-page-route';
import HomeMain from './components/home-main/home-main';
import AddGenre from './components/add-genre/add-genre';
import AddVideo from './components/add-video/add-video';
import EditVideo from './components/edit-video/edit-video';
import { LatertubeContext } from './latertube-context';
//import { STORE } from './store';
import config from '../src/config';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      genres: [],
      videos: [],
      filteredVideos: [],
      error: null
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
    this.state.videos.unshift(newVideo)
    const newVideos = this.state.videos
    this.setState({
      videos:  newVideos,
      filteredVideos: newVideos
    })
  }

  //Update Video
  handleUpdateVideo = (updateInfo) => {
    const updatedVideos = this.state.videos.map(video => {
        if (Number(video.video_id) === Number(updateInfo.video_id)) {
          return updateInfo
        } else {
          return video
        }
      }
    )

    updatedVideos.splice(updatedVideos.indexOf(updateInfo) , 1)
    updatedVideos.unshift(updateInfo)

    console.log('after update done')
    console.log(updatedVideos)
    this.setState({
      videos: updatedVideos,
      filteredVideos: updatedVideos
    })
  }

  //Delete Video
  handleDeleteVideo = (videoId) => {
    const updatedVideos = this.state.videos.filter(video => Number(video.video_id) !== Number(videoId))
    this.setState({
      videos: updatedVideos,
      filteredVideos: updatedVideos
    })
  }

  //Filter Video
  handleFilterVideo = (keyword, rating, genreId) => {
    const videosIncludeKeyword = this.state.videos.filter(video => video.video_title.toLowerCase().includes(keyword.toLowerCase()))
    const videosMatchRating = videosIncludeKeyword.filter(video => Number(video.video_rating) >= Number(rating))
    const videosMatchGenre = genreId ? videosMatchRating.filter(video => video.genre_id === genreId ) : videosMatchRating
    this.setState({
      filteredVideos: videosMatchGenre
    })
}

  componentDidMount(){
    let genresArray = []
    let videosArray = []

    fetch(`${config.API_ENDPOINT}/genres`)
      .then(res => {
        if (!res.ok){
          throw new Error(res.error)
        } 
        return res.json()
      })
      .then(resJson => genresArray = resJson)
      .then(response => {
        fetch(`${config.API_ENDPOINT}/videos`)
          .then(res => {
            if (!res.ok){
              throw new Error(res.error)
            }
            return res.json()
          })
          .then(resJson => videosArray = resJson)
          .then(bothReturned => {
            this.setState({
              genres: genresArray,
              videos: videosArray,
              filteredVideos: videosArray,
            })
          })
          .catch(err => {
            this.setState({
              error: err.message
            })
          })
        })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }


  render(){
    return(
      <>
        <LatertubeContext.Provider value={
          {
            genres: this.state.genres || [],
            videos: this.state.videos || [],
            filteredVideos: this.state.filteredVideos || [],
            filterVideo: this.handleFilterVideo,
            addNewGenre: this.handleAddNewGenre,
            addNewVideo: this.handleAddNewVideo,
            updateVideo: this.handleUpdateVideo,
            deleteVideo: this.handleDeleteVideo
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
                <Route path="/videos/:videoId/edit" component={EditVideo} />
            </Switch>
          </main>
        </LatertubeContext.Provider>
      </>
    )
  }
}

export default App;
