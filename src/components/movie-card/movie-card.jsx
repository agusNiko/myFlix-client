import React from 'react';

export class MovieCard extends React.Component{



  render(){
    const { movieData, onMovieClick } = this.props; //is this prop the 'movieData={movie}' from main-view????
     
    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div>;
              
  }
}

