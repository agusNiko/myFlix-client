import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component{

    render(){

        const {movie, onBackClick} = this.props;
        return (
            <Card style={{ width: '20rem' }} className="justify-content-md-center" className="movie-view">
                <Card.Body>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                </Card.Body>
                <Button variant="primary" onClick={()=> onBackClick(null)}>Back</Button>
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