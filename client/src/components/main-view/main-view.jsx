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
      user: null,
      
      register: false,
    };
  }

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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
      // userAction: null,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
      // userAction: null,
    });
  }

  //button to return to all movies view
  onButtonClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  //testing
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false,
    });
  }

  register() {
    this.setState({ register: true });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false)
      return (
        <LoginView
          onClick={() => this.onRegistered()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );

    if (register)
      return (
        <RegistrationView
          onClick={() => this.alreadyMember()}
          onSignedIn={(user) => this.onSignedIn(user)}
        />
      );

    //before the movies has been loaded
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.onButtonClick()}
              />
            ) : (
              movies.map((movie) => (
                <Col key={movie._id} xs={12} sm={6} md={4}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={(movie) => this.onMovieClick(movie)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}