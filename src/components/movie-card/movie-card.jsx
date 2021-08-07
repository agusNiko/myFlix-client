import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from "react-router-dom";


export class MovieCard extends React.Component{

  render(){
    // const { movieData, onMovieClick } = this.props; //is this prop the 'movieData={movie}' from main-view????
    const { movieData } = this.props;

    return (
      <Card style={{ width: '15rem', margin: '0 auto'}} className="movie-card mt-2">
        <Card.Body>
          <Card.Img variant="top" src={movieData.ImagePath} />
          <Card.Title>{movieData.Title}</Card.Title>
          
        </Card.Body>
        <Link  to={`/movies/${movieData._id}`}>
          <Button variant="primary" style={{ width: '15rem'}}>Open</Button>
        </Link>
        {/* <Button variant="primary" onClick={()=> onMovieClick(movieData)}>Open</Button> */}
      </Card>    
    );  
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};