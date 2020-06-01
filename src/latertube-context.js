import React from 'react';

export const LatertubeContext = React.createContext({
    genres: [],
    videos: [],
    filteredVideos: [],
    addNewGenre: () => {},
    addNewVideo: () => {},
    filterVideo: () => {},
    filterVideoByTitle: () => {},
    updateVideo: () => {},
    deleteVideo: () => {},
})

