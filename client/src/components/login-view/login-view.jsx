import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      props.onLoggedIn(username);
    // /* Send a request to the server for authentication */
    // axios.post('https://shielded-oasis-17182.herokuapp.com/login', {
    //   Username: username,
    //   Password: password
    // })
    // .then(response => {
    //   const data = response.data;
    //   props.onLoggedIn(data);
    // })
    // .catch(e => {
    //   console.log('no such user')
    // });
  };

  const notRegistered = (e) => {
    e.preventDefault();
    props.notRegistered(true);
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
        <button type="button" className="btn btn-link" onClick={notRegistered}>
          Click here to create a new account!
        </button>
      </Form>
    </Container>
  );
}