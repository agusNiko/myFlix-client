import React from 'react';
import axios from 'axios';


import { LoginView} from '../login-view/login-view'
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/MovieView'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class MainView extends React.Component{

    constructor(){
        super();// initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor()
        this.state = { //this is the component statement(variable)??????
            movies: [
     
            ],
            selectedMovie: null,
            user: null,
        };
    }

    componentDidMount(){ 
        axios.get('https://myflapix.herokuapp.com/movies') 
            .then(response => {
                this.setState({
                    movies:response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
   
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegistration(user) {
        this.setState(
            {
                user 
            }
        );
    }

    render() {
        //const movies = this.state.movies; /////// instead of this expression we use the "object destruction"
        const { movies, selectedMovie, user } = this.state; // What is the object destruction? I did not understand 
       
        if (user === 'newUser') return <RegistrationView onRegistration={user => this.onRegistration(user)}/>
       
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
       if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

       //if (selectedMovie) return <MovieView movie={selectedMovie}/>

        if (movies.length === 0) return <div className="main-view"/>;

        return (
            <Container fluid>
                <Row className="main-view">
                      {selectedMovie
                        ? (
                
                            <Col md={1}>
                                <MovieView  movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectMovie(newSelectedMovie); }}/>
                            </Col>
 
                        )
                        : (
                            movies.map(movie => (
                                    <Col md={3}> 
                                        <MovieCard 
                                            key={movie._id} 
                                            movieData={movie} 
                                            onMovieClick={newSelectedMovie => { 
                                                this.setSelectMovie(newSelectedMovie); 
                                            }}
                                        />
                                    </Col>
                            ))

                           
                    )
                }
                </Row> 
            </Container> //movieData is the promp?????????,
        );
    }

}

