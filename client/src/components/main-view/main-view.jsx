import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
    };
  }
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
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
     { movies.map(movie => (
       <div className="movie-card" key={movie._id}>{movie.Title}</div>
     ))}
     </div>
    );
  }
}