import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieView extends React.Component{


    render(){

        const {movie, onBackClick, toFavoriteMovie, removeFavoriteMovie} = this.props;
      
        return (
            <Card style={{ width: '20rem' }} className="justify-content-md-center" className="movie-view">
                <Card.Body>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                </Card.Body>
    
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
                </Link>

                <Button variant="primary" onClick={()=> onBackClick(null)}>Back</Button>

                <Button variant="btn btn-success" onClick={() => toFavoriteMovie(movie._id)}>add to favorites</Button>

                <Button variant="secondary" onClick={() => removeFavoriteMovie(movie._id)}>remove from favorites</Button>


            
            </Card>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    
    onBackClick: PropTypes.func.isRequired
  };