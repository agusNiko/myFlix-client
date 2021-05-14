import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import axios from 'axios';



import { Link } from "react-router-dom";

export function ProfileView(props) {
   
    const [ newUsername, setNewUsername ] = useState('');
    const [ username, setUsername ] = useState(props.userData.Username)
    const [ favoriteMovie, setFavoriteMovie ] = useState('')

    const {userData,  onBackClick, onUnregisterClick, movies} = props

    const handleSubmit = (e) => {
        e.preventDefault();
      
        const data = {"Username": newUsername};
        console.log(data);
        axios.put(`https://myflapix.herokuapp.com/users/${localStorage.user}`, data,
            {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            }).then(response => {
            console.log(data)
            setUsername(newUsername)
            localStorage.setItem('user', newUsername)
            // window.open('/', '_self');
          })
          .catch(err => {
            console.log(err);
          });
    };

    const removeFromFavorites = (e) => {
        e.preventDefault();
        console.log(userData)
        
        axios.post(`https://myflapix.herokuapp.com/users/movies/${localStorage.user}/${userData.FavoriteMovies}/remove`, {},
        {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        }).then(response => {
        console.log('Favorite movie was removed')
              
       //window.open('/profile', '_self');
      })
      .catch(err => {
        console.log(err);
      });
    }



    useEffect(() => {
    
        const favMovieIndex = movies.findIndex((movie) => {
            return movie._id === userData.FavoriteMovies[0];
        })

        if (!movies.[favMovieIndex]){
            setFavoriteMovie('no favorite movie')
        } else {
        setFavoriteMovie(movies.[favMovieIndex].Title)
        console.log(favoriteMovie)
        }
      });
    
    return (

            <div>
            <Card style={{ width: '20rem' }} className="justify-content-md-center" className="movie-view">
                <Card.Body>
                   
                    <Card.Title>Username: {username}</Card.Title>
                    <Card.Text>Birthday: {userData.Birthday}</Card.Text>
                    <Card.Text>E-mail: {userData.Email}</Card.Text>
                    <Card.Text>Favorite movie: {favoriteMovie}</Card.Text>
                    <button varian="alert" onClick={removeFromFavorites}>remove movie</button>
                </Card.Body>
              

                <Button variant="primary" onClick={()=> onBackClick(null)}>Back</Button>

                <Button variant="primary" onClick={() => onUnregisterClick()}>Unregister</Button>
            
            </Card> 

            <Form className="login was-validated" noValidate >
                <Form.Group  controlId="formUsername">
                <Form.Label>
                    New Username:
                </Form.Label>
                <Form.Control  
                required
                type='text'
                placeholder="Enter username" 
                value={newUsername} 
                maxLength={20}
                minLength={5}
                onChange={e => setNewUsername(e.target.value)} />
                <Form.Control.Feedback type="valid">
                awesome you did it!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                This field is mandatory!
                </Form.Control.Feedback>
                </Form.Group>
                <button type="button" onClick={handleSubmit}>Submit</button>
          </Form>

            </div>

        );
    
}

// ProfileView.propTypes = {
//     movie: PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       ImagePath: PropTypes.string.isRequired
//     }).isRequired,
    
//     onBackClick: PropTypes.func.isRequired
//   };