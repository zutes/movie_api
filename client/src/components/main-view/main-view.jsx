import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";

import "./main-view.scss";


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
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
    }
  }



  getMovies(token) {
    axios.get('https://shielded-oasis-17182.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  onRegister(register) {
    this.setState({
      register: register
    });
  }



  render() {
    const { movies, user } = this.state;



    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />
          {/* you keep the rest routes here */}
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
        </div>
      </Router>
    );
  }
}

/*
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}
      notRegistered={(register) => this.onRegister(register)} />;

    if (register) return <RegistrationView />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie
              ? (<MovieView movie={selectedMovie} onClick={() => this.onMovieClick()} />)
              : (movies.map((movie) => (
                <Col key={movie._id}>
                  <MovieCard key={movie._id} movie={movie} onClick={(movie) => this.onMovieClick(movie)} />
                </Col>
              ))
              )}
          </Row>
          <Button type="button" className="logout" variant="info" onClick={() => this.onLoggedOut()}>
          <b>Log Out</b>
        </Button>
        </Container>
      </div>
    );
  }
}
*/