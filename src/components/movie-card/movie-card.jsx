import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';
import Card from 'react-bootstrap';

export class MovieCard extends React.Component{

  render(){
    const { movieData, onMovieClick } = this.props; //is this prop the 'movieData={movie}' from main-view????
     
    return (
      <Card>
        <Card.img variant="top" src={movieData.ImagePath}/>
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>

          <Button onClick={()=> onMovieClick(movieData)} variant="link">Open</Button>
        </Card.Body>

{/* <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>{movieData.Title}</div> */}
      </Card>
    
    );  
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};