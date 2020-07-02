//This is a high-level component that renders a list of all movies, consisting of small movie card (MovieCard components)

import React from 'react';
import axios from 'axios'; //Axios is a package that is used to send lcient requests, it hooks the frontend code with the API
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor so React can initialize it
    super();
    // Initialize the state to an empty object so we can destructure it later

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get('https://shielded-oasis-17182.herokuapp.com/movies') //Axios instructed to GET the movies from my endpoint
      .then((response) => {
        // Assign the result to the state
        // The asynchronous setState() method has been used to tell React that your component's state has changed
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    /* The curly brace syntax inside of <div className="main-view"> leverages the ability of JSX to run some JS code "within" HTML elements.
    // Here, you loop over the movies array and return a div for each movie within the array.
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onClick={() => this.onMovieClick(null)}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={(movie) => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
*/

//Updated return
return (
  <div className="main-view">
   {selectedMovie
      ? <MovieView movie={selectedMovie}/>
      : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
      ))
   }
  </div>
 );
}
}