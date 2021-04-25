import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/MovieView'



export class MainView extends React.Component{

    constructor(){
        super();// initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor()
        this.state = { //this is the component statement(variable)??????
            movies: [
     
            ],
            selectedMovie: null
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


    render() {
        //const movies = this.state.movies; /////// instead of this expression we use the "object destruction"
        const { movies, selectedMovie } = this.state; // What is the object destruction? I did not understand 
        
        // if (selectedMovie) return <MovieView movie={selectedMovie}/>

        if (movies.length === 0) return <div className="main-view"/>;

        return (
            <div className="main-view">
                <div>The thee worst Zombie movies: </div>
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectMovie(newSelectedMovie); }}/>

                    : movies.map(
                        movie =>{
                            return  <MovieCard 
                                key={movie._id} 
                                movieData={movie} 
                                onMovieClick={(movie) => {this.setSelectMovie(movie)}} 
                                />
                            })
                }
                       
            </div> //movieData is the promp?????????
        );
    }

}