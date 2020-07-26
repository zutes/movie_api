import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userData: null

    };
  }

  componentDidMount() {
        let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios.get(`https://shielded-oasis-17182.herokuapp.com/users/:Username`, {
      isLoading: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log(response);
        this.setState({
          userData: response.data,
          isLoading: false,

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { username, password, email, birthday } = this.state;

    if (isLoading)
      return (
        <div>
          <Container>
            <h1>My Profile</h1>
            <br />
            <Card>
              <Card.Body>
                <Card.Text>Username: {this.state.username}</Card.Text>
                <Card.Text>Password: {this.state.password}</Card.Text>
                <Card.Text>Email: {this.state.email}</Card.Text>
                <Card.Text>Birthday: {this.state.birthday}</Card.Text>
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