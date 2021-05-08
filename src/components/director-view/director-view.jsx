import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
    render(){
        const {director, onBackClick} = this.props;
        return (
            <Card style={{ width: '40rem' }} className="justify-content-md-center" className="director-view">
                <Card.Body>

                    <Card.Title>{director.Name}</Card.Title>
                    <Card.Text>{director.Bio}</Card.Text>
  
                </Card.Body>
                <Link to={`/`}>
                    <Button style={{ width: '40rem' }} variant="secondary">Main View</Button>
                </Link>
               
                <Button variant="primary" onClick={()=> onBackClick(null)}>Back</Button>
            
            </Card>
    );
    
}
}

DirectorView.propTypes = {
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
    
    onBackClick: PropTypes.func.isRequired
  };