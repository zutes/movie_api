import React, { useState } from 'react';
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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios.get('https://shielded-oasis-17182.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data,
          Username: response.data.username,
          Password: response.data.password,
          Email: response.data.email,
          Birthday: response.data.birthday,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { username, password, email, birthday } = this.state;

    return (
      <div>
        <Container>
          <h1>My Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {username}</Card.Text>
              <Card.Text>Password: {password}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Birthday: {birthday}</Card.Text>
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