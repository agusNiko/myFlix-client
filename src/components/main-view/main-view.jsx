import React from 'react';
import axios from 'axios';

// #0.0
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// #0
import { setUserData } from '../../actions/actions';
import { setMovies } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';


import { LoginView} from '../login-view/login-view'
import { RegistrationView } from '../registration-view/registration-view';

import { MovieView } from '../movie-view/MovieView'
import  Header  from '../header/header';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';

import ProfileView from '../profile-view/profile-view';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class MainView extends React.Component{

    constructor(){
        super();// initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor()
        this.state = { 
            selectedMovie: null,
            user: null,
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
          // this.setState({movies: response.data}); removed to add to the props.setMovies
          
          this.props.setMovies(response.data);
          console.log('redux-State movies has been set')
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
        // console.log(response)
        // this.setState({
        //   userData: response.data
        // });
        this.props.setUserData(response.data);
        console.log('redux-state userData should be set')
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
         
      if (window.confirm("Do you really want to delete your account?")) {
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
      const { user } = this.state;
      const { movies, userData } = this.props;

      return (
    
      <Router>

<Header onLogOut={() => { this.onLoggedOut() }}/>
       
         <div className="main-view">
     
          <Route exact path="/" render={() => {

            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
             
            if (movies.length === 0) return <div className="main-view" />; //I think I don't need this line

            return <MoviesList movies={movies}/>;
            
            // movies.map(m => (     
                       
            //   <Col lg={3} md={4} sm={6} key={m._id}>

            //     <MovieCard movieData={m} />
            //   </Col> 
            // ))
          }}/>

          <Route path="/register" render={() => {
             if (user) return <Redirect to="/" />
             return <Col>
               <RegistrationView />
             </Col>
                 
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return <MovieView  movie={
                movies.find(m => m._id === match.params.movieId)} 
                onBackClick={() => history.goBack()} 
                toFavoriteMovie={(movieId)=> {this.addToFavorites(movieId)}}
                removeFavoriteMovie={(movieId)=> {this.removeMovie(movieId)}}
                userData = {userData}
                />
            
          }}/>

          <Route path="/profile" render={({history}) => {
            if (!user) return <Redirect to="/" />
             return <Col>
               <ProfileView onBackClick={() => history.goBack() } onUnregisterClick={() => this.unRegister()} userData = {userData} removeFavoriteMovie={(movieId)=> {this.removeMovie(movieId)}}/>
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

        </div>
    
      </Router>
    );

  }

}


let mapStateToProps = state => {
  return { movies: state.movies,
           userData: state.userData }
}

//how to set the 

export default connect(mapStateToProps, { setMovies, setUserData} )(MainView);

