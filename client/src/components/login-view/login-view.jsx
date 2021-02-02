import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Posts username and password for login
   * @function handleSubmit
   * @param {event}
   * @return {object} user info 
   */
  const handleSubmit = (e) => {
    e.preventDefault(); //This prevents default behavior of submitting a form
    //Then sends a request to the server for authentication passing the username and password
    axios.post('https://shielded-oasis-17182.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data); //If there is a match the onLoggedIn method that was passed through the props is called
      })
      .catch(e => {
        console.log('no such user')
      });
  };



  return (
    <Container className="login-container">
      <Form className="login-form">

        <Form.Group controlId="formBasicUsername">
          <h3>Log In</h3>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="info" type="submit" onClick={handleSubmit}>Sign In</Button><br></br>

        <Link to={`/register`}>
          <Button variant="link" className="registerButton" type="submit">
            New Users Register Here!
          </Button>
        </Link>

      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};