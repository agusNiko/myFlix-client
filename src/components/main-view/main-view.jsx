import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import { LoginView} from '../login-view/login-view'
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/MovieView'
import  Header  from '../header/header';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';

import {ProfileView} from '../profile-view/profile-view';

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
            userData: [],
        };
    }
    
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
          this.getUser(accessToken)
        }
    }

    getMovies(token) {
        axios.get('https://myflapix.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    getUser(token){
      axios.get(`https://myflapix.herokuapp.com/users/${localStorage.user}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        console.log(response)
        this.setState({
          userData: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    addToFavorites(movieId){
      axios.post(`https://myflapix.herokuapp.com/users/movies/${localStorage.user}/${movieId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(response => {
        // Assign the result to the state
        console.log(response)
        console.log(movieId+' was added') 
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    removeMovie(movieId){
      axios.post(`https://myflapix.herokuapp.com/users/movies/${localStorage.user}/${movieId}/remove`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(response => {
        // Assign the result to the state
        console.log(response)
        console.log(movieId+' was removed')       
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    //I am working here
    unRegister(){
           
        alert('are you sure????'); //how can I create a a cancel alert????
     
      axios.delete(`https://myflapix.herokuapp.com/users/${localStorage.user}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
          // Assign the result to the state
          this.setState({
            user: null,
            userData:[]
          });
        }
      ).catch(function (error) {
        console.log(error);
      });
    }


    setSelectMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
   
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
        this.getUser(authData.token)
      }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null,
          userData:[]
        });
      }

    render() {
      const { movies, user, userData } = this.state;

      return (
    
      <Router>

      <Header onLogOut={() => { this.onLoggedOut() }}/>
        
        <Container>

        

        <Row className="main-view">
     
          <Route exact path="/" render={() => {

            if (!user) return <Row>
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>

            </Col>
            </Row>

            return movies.map(m => (     
                       
              <Col lg={3} md={4} sm={6} key={m._id}>

                <MovieCard movieData={m} />
              </Col> 
            ))
          }}/>

          <Route path="/register" render={() => {
             if (user) return <Redirect to="/" />
             return <Col>
               <RegistrationView />
             </Col>
                 
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return <Col md={8}>
              <MovieView  movie={
                movies.find(m => m._id === match.params.movieId)} 
                onBackClick={() => history.goBack()} 
                toFavoriteMovie={(movieId)=> {this.addToFavorites(movieId)}}
                removeFavoriteMovie={(movieId)=> {this.removeMovie(movieId)}}
                userData = {userData}
                />
            </Col>
          }}/>

          <Route path="/profile" render={({history}) => {
            if (!user) return <Redirect to="/" />
             return <Col>
               <ProfileView userData={userData} movies={movies} onBackClick={() => history.goBack() } onUnregisterClick={() => this.unRegister()} />
             </Col>
             }}
            />

          <Route path="/directors/:name" render={({ match, history }) => {
         if (!user) return <Redirect to="/" />
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
          }
          }/>

          <Route path="/genres/:genreName" render={({ match, history }) => {
         if (!user) return <Redirect to="/" />
          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.genreName).Genre} onBackClick={() => history.goBack()} />
          </Col>
          }
          }/>

        </Row>
        </Container>
      </Router>
    );



      //   //const movies = this.state.movies; /////// instead of this expression we use the "object destruction"
      //   const { movies, selectedMovie, user } = this.state; // What is the object destruction? I did not understand 

      //   if (user === 'newUser') return <RegistrationView onRegistration={user => this.onRegistration(user)}/>
       
      //   /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
      //  if (!user) return 
      //   <Row>
      //       <Col>
      //       <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      //       </Col>
      //   </Row>
      //  //if (selectedMovie) return <MovieView movie={selectedMovie}/>

      //   if (movies.length === 0) return <div className="main-view"/>;

      //   return (
      //       <Container>
      //        <Header/>  
      //        <button onClick={() => { this.onLoggedOut() }}>Logout</button>
      //           <Row className="main-view">
            
      //                 {selectedMovie
      //                   ? (
                
      //                       <Col md={1}>
      //                           <MovieView  movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectMovie(newSelectedMovie); }}/>
      //                       </Col>
 
      //                   )
      //                   : (
      //                       movies.map(movie => (
      //                               <Col lg={3} md={4} sm={6}> 
      //                                   <MovieCard 
      //                                       key={movie._id} 
      //                                       movieData={movie} 
      //                                       onMovieClick={newSelectedMovie => { 
      //                                           this.setSelectMovie(newSelectedMovie); 
      //                                       }}
      //                                   />
      //                               </Col>
      //                       ))

                           
      //               )
      //           }
      //           </Row> 
                
      //       </Container> //movieData is the promp?????????,
      //   );
    }

}

