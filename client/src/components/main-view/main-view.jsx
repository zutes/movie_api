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
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      favorites: [],
      //selectedMovie: null
    };
  }

  getMovies(token) {
    axios.get(`https://shielded-oasis-17182.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` } //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
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

  /*In the code below, you first get the value of the token from localStorage. Notice the syntax used to get a key from localStorage: localStorage.getItem('YOUR_KEY').
  If the access token is present, it means the user is already logged in and you can call the getMovies method, which makes a GET request to the movies endpoint.
  */
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username //THe user's Username has been saved in the user state
    });

    localStorage.setItem('token', authData.token);  //The auth information received from the handleSubmit method—the token and the user—has been saved in localStorage
    localStorage.setItem('user', authData.user.Username); //localStorage has a setItem method that accepts two arguments: a key and a value. In this example, the token and username have been saved.
    this.getMovies(authData.token);  //this.getMovies(authData) is called and will get the movies from your API once the user is logged in
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  onRegister(register) {
    this.setState({
      register: register
    });
  }



  render() {
    const { movies, user, favorites } = this.state;



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
          <Route path="/users/:Username" render={() => <ProfileView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }
          } />


          <Button variant="primary" type="submit" onClick={() => this.onLoggedOut()}>Logout</Button>


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