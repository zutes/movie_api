import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./main-view.scss";


/*In the section of code marked #0, you imported the relevant actions (setMovies).
This action will be used in code section #2, where you connect it to the MainView using, again,
the connect() function, which returns another function. This is basically a way of wrapping inputs and outputs to a component.*/

// #0
import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

//Notice in the code below how MainView no longer carries its own state; the movies live in the store now. 

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
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

  getMovies(token) {
    axios.get(`https://shielded-oasis-17182.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` } //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
    })
      .then(response => {
        // #1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
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
    window.open('/', '_self');
  }

  onRegister(register) {
    this.setState({
      register: register
    });
  }

  render() {
    // #2
    let { movies } = this.props;
    let { user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Route exact path='/' render={() => {
            if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);
            return <MoviesList movies={movies} />;
          }
          } />

          <Route path='/register' render={() => <RegistrationView />} />

          <Route path='/user' render={() => <ProfileView movies={movies} />} />

          <Route path='/movies/:movieId' render={({ match }) => (<MovieView movie={movies.find(m => m._id === match.params.movieId)} />)} />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (<DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            );
          }
          } />

          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (<GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            );
          }
          } />
        </div>
        <div>
          <Button className="logoutButton" variant="primary" size="lg" block onClick={() => this.onLoggedOut()}>Log Out</Button>
        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies, setUser })(MainView);