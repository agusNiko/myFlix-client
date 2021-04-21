import React from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/MovieView'

export class MainView extends React.Component{

    constructor(){
        super();// initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor()
        this.state = { //this is the component statement(variable)??????
            movies: [
                { _id: 1, Title: 'Redneck Zombies', Description: 'A barrel of radioactive waste is lost out in the woods. Some demented rednecks find it and use it as part of their still. Everybody who drinks the liquor they produced turns into zombies. ', ImagePath: 'https://www.imdb.com/title/tt0093833/mediaviewer/rm1923278592?ref_=tt_ov_i'},
                { _id: 2, Title: 'Zoombies', Description: 'When a strange virus quickly spreads through a safari park and turns all the zoo animals undead, those left in the park must stop the creatures before they escape and zombify the whole city. ', ImagePath: 'https://www.imdb.com/title/tt5340882/mediaviewer/rm1387665408?ref_=tt_ov_i'},
                { _id: 3, Title: 'Zombiber', Description: 'A fun weekend turns into madness and horror for a bunch of groupies looking for fun in a beaver infested swamp. ', ImagePath: './redneckzombie.jpg'}  
            ],
            selectedMovie: null
        };
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

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectMovie(newSelectedMovie); }}/>

                    : movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => {this.setSelectMovie(movie)}} />)
                }
                       
            </div> //movieData is the promp?????????
        );
    }

}