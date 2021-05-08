import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
    render(){
        const {genre, onBackClick} = this.props;
        return (
            
            <Card style={{ width: '40rem' }} className="justify-content-md-center" className="genre-view">
                <Card.Body>

                    <Card.Title>{genre.Name}</Card.Title>
                    <Card.Text>{genre.Description}</Card.Text>
  
                </Card.Body>
                <Link to={`/`}>
                    <Button style={{ width: '40rem' }} variant="secondary">Main View</Button>
                </Link>
               
                <Button variant="primary" onClick={()=> onBackClick(null)}>Back</Button>
            
            </Card>
    );
    
}
}

GenreView.propTypes = {
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    
    onBackClick: PropTypes.func.isRequired
  };