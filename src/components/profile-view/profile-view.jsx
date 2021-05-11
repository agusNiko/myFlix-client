import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class ProfileView extends React.Component{

    render(){

        const {userData, onBackClick} = this.props;
        return (
            <Card style={{ width: '20rem' }} className="justify-content-md-center" className="movie-view">
                <Card.Body>
                   
                    <Card.Title>Username: {userData.Username}</Card.Title>
                    <Card.Text>Birthday: {userData.Birthday}</Card.Text>
                    <Card.Text>E-mail: {userData.Email}</Card.Text>
                    <Card.Text>Favorite movie:{userData.FavoriteMovies}</Card.Text>
                </Card.Body>
                <Link to={`/`}>
                    <Button variant="secondary">Main View</Button>
                </Link>
{/*     
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
                </Link> */}

                <Button variant="primary" onClick={()=> onBackClick(null)}>Back</Button>

                <Button variant="primary" onClick={}>Unregister</Button>
            
            </Card>
        );
    }
}

// ProfileView.propTypes = {
//     movie: PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       ImagePath: PropTypes.string.isRequired
//     }).isRequired,
    
//     onBackClick: PropTypes.func.isRequired
//   };