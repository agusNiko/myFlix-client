import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component{

  render(){
    const { movieData, onMovieClick } = this.props; //is this prop the 'movieData={movie}' from main-view????
     
    return (
   
            <Card style={{ width: '15rem' }} className="movie-card">
            <Card.Body>
              <Card.Img variant="top" src={movieData.ImagePath} />
              <Card.Title>{movieData.Title}</Card.Title>

            </Card.Body>
            <Button variant="primary" onClick={()=> onMovieClick(movieData)}>Open</Button>
            <br></br>
           </Card>    
    );  
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};