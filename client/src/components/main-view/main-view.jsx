import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();
    // Initialize the state to an empty object so we can destructure it later

    this.state = {
      movies: null,
      selectedMovie: null,
    };
  }
// This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get('https://shielded-oasis-17182.herokuapp.com/movies')
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
     { movies.map(movie => (
       <MovieCard key={movie._id} movie={movie}/>
     ))}
     </div>
    );
  }
}