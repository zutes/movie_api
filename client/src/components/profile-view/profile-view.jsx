import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');


    axios.get(`https://shielded-oasis-17182.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { Username, Passoword, Email, Birthday } = this.state;

    return (
      <div>
        <Container>
          <h1>My Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Password: {this.state.Password}</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
              <br />
              <br />
              <Link to={`/`}>Back</Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
