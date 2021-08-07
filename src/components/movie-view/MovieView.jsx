import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";


export function MovieView(props) {
    const {movie, onBackClick, toFavoriteMovie, removeFavoriteMovie, userData} = props;

    const [ favMovie ] = useState(userData.FavoriteMovies); 
    const [ favMovieAdded, setfavMovieAdded]= useState()
    const [ movieId ] = useState(movie._id)
    const [ on, setOn ] = useState(false);
    
    console.log(userData)
    console.log(favMovie)
    
    useEffect(() => {
        
        const found = favMovie.find(element => element === movieId);
        if(found){setOn(true)}
        console.log(found)

  
      });

    const toggle = ()=> {
          setOn(!on)
    }
     

    return (
        <Row className="justify-content-md-between" style={{width:"100%"}}>
            <Col></Col>
            <Col>
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
                    { !on &&
                    <Button variant="btn btn-success" onClick={() => {toFavoriteMovie(movie._id); toggle()}}>add to favorites</Button>
                    }
                    { on &&
                    <Button variant="secondary" onClick={() => { removeFavoriteMovie(movie._id); toggle()}}>remove from favorites</Button>
                    }
                    
                </Card>
            </Col>
            <Col></Col>
        </Row>
    );

}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    
    onBackClick: PropTypes.func.isRequired
  };