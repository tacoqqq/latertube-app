import React from 'react';

export const LatertubeContext = React.createContext({
    genres: [],
    videos: [],
    addNewGenre: () => {},
    addNewVideo: () => {},
    filterVideoByTitle: () => {},
    updateVideo: () => {},
    deleteVideo: () => {}
})

