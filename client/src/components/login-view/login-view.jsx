import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication, then call props.onLoggedIn(username) */
    props.onSignedIn(username);
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