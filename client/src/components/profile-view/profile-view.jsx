import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      //userData: null,
      favoriteMovies: [],
      //movies: [],
    };
  }


  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios
      .get(`https://shielded-oasis-17182.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then(res => {
        this.setState({
          username: res.data.Username,
          password: res.data.Password,
          email: res.data.Email,
          birthday: res.data.Birthday,
          favoriteMovies: res.data.FavoriteMovies,
        });

        console.log(res.data.Username);
        console.log(res.data.Password);
        console.log(res.data.Email);
        console.log(res.data.Birthday);
        console.log(res.data.FavoriteMovies);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteFavoriteMovie(movieId) {
    axios.delete(`https://shielded-oasis-17182.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(response => {
        console.log(response)
        console.log('successfully deleted')
        this.getUser(localStorage.token)
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .put(
        `https://shielded-oasis-17182.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: this.state.usernameForm,
          Password: this.state.passwordForm,
          Email: this.state.emailForm,
          Birthday: this.state.birthdayForm
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(res => {
        console.log("Your account details have been updated.");
        localStorage.setItem("user", this.state.usernameForm);
        this.getUser(localStorage.getItem("token"));
        window.open("/", "_self");

      })
      .catch(error => {
        console.log("error");
      });
  }

  handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`https://shielded-oasis-17182.herokuapp.com/users/${localStorage.getItem("user")}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => {
        console.log("Your account has been successfully deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(e => {
        console.log('error deleting your account')
      });
  };


  render() {

    const { username, email, birthday } = this.state;
    const { movies } = this.props;
    const favoriteMoviesList = movies.filter((movie) =>
      this.state.favoriteMovies.includes(movie._id)
    );

    return (
      <Container>
        <div className="profile-view">
          <Card.Body>
            <Card.Text>Username: {username}</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>Birthday: {birthday}</Card.Text>
                    Favorite Movies: {favoriteMoviesList.map((movie) => (
              <div key={movie.id} className="favorite-movies">
                <Link to={'/movies/${movie._id}'}>
                  <Button variant="link">{movie.Title}</Button>
                </Link>
                <Button onClick={(e) => this.deleteFavoriteMovie(movie._id)}>Remove Movie</Button>
              </div>
            ))}

          </Card.Body>
        </div>

        <Form className="updateInfoForm">
          <Col xs={4}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control type="username" placedholder="Update your user name" name='usernameForm' onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placedholder="Password" name="passwordForm" onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placedholder="Email" name="emailForm" onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="birthday" placedholder="Birthday" name="birthdayForm" onChange={e => this.handleUpdate(e)} />
            </Form.Group>
          </Col>
          <Row>
            <Button variant="primary" type="button" onClick={e => this.handleSubmit(e)}>Update</Button >
            <Button variant="primary" type="button" onClick={e => this.handleDelete(e)}>Delete Account</Button >

            <Link to={`/`}>
              <Button variant="primary" type="button">Back</Button>
            </Link>

          </Row>
        </Form>
      </Container>
    );
  }
}